import { DatePipe } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session.service';
import { BASE_URL } from 'src/app/app.provider';
import { Router } from '@angular/router';
import { CompanyProfile } from './company-profile-models';
import { SessionStorageService } from 'src/app/shared/session-storage.service';
import { timeStamp } from 'console';
import { ThemeService } from 'ng2-charts';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from './checkout/checkout.component';


@Injectable({
  providedIn: 'root'
})
export class PayWizardService {

  private getCheckoutUrl   = this.baseUrl + '/billing/payments/checkout?';//amount=&currency=&customer=
  private getPayResultUrl  = this.baseUrl + '/billing/payments/result?';//checkoutId=&companyId=
  //private refundPaymentUrl = this.baseUrl + '/billing/payment/refund?peachId=';
  //private recurrPaymentUrl = this.baseUrl + '/billing/payment/recurring?regToken=';

  private companySubscriptionUrl    = this.baseUrl + '/billing/company-subscription';
  private companyUnsubscribeUrl     = this.baseUrl + '/billing/company-unsubscribe?companyId=';
  private companyBillingDetails     = this.baseUrl + '/billing/company-details?companyId=';
  
  private currency!: string; // change that to a new Currency type in the future which will list all peachpayments supported currencies
  private errorSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private step!: string; // subscribe / unsubscribe / updSubscription
  private companyName!: string;
  private companyId!: string;
  private subscription!: string;
  private joinDate!: string;
  private nextBillingDate!: string;
  private amount!: string;
  private paymentMethod!: string;
  private checkoutId!: string;
  private paymentId!: string;
  private existingCCToken!: boolean; // does a credit card token exists, i.e. did this client has done an intial transaction with us yet?
  private existingInstance!: boolean;
  private companyBillingProfile: any;

  constructor(public dialog: MatDialog, @Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private sessionClass: SessionService, private sessionStorage: SessionStorageService, private router: Router) {
    let storedCompanyID    = this.sessionStorage.getItem('company-id');
    let storedCompanyName  = this.sessionStorage.getItem('company-name');
    let storedCheckoutID   = this.sessionStorage.getItem('checkout-id');
    let storedRegToken     = this.sessionStorage.getItem('registration-token');
    let storedSubscription = this.sessionStorage.getItem('blue-subscription');
    let storedSubscrDate   = this.sessionStorage.getItem('subscription-date');
    let storedBillingDate  = this.sessionStorage.getItem('billing-date');
    let storedPayMethod    = this.sessionStorage.getItem('payment-method');
    let storedAmount       = this.sessionStorage.getItem('fee-amount');
    let existingSubscr     = this.sessionStorage.getItem('existing-subscription');
    let cBillingProfile    = this.sessionStorage.getItem('company-billing-profile');
    if (storedCompanyID    !== null) this.companyId    = storedCompanyID;
    if (storedCompanyName  !== null) this.companyName  = storedCompanyName;
    if (storedCheckoutID   !== null) this.checkoutId   = storedCheckoutID;
    if (storedSubscription !== null) this.subscription = storedSubscription;
    if (storedSubscrDate   !== null) this.joinDate     = storedSubscrDate;
    if (storedBillingDate  !== null) this.nextBillingDate  = storedBillingDate;
    if (storedPayMethod    !== null) this.paymentMethod    = storedPayMethod;
    if (storedAmount       !== null) this.amount           = storedAmount;
    if (storedRegToken     !== null) this.existingCCToken  = storedRegToken;
    if (existingSubscr     !== null) this.existingInstance = existingSubscr;
    if (cBillingProfile    !== null) this.companyBillingProfile = cBillingProfile;
  }

  getStep(){
    return this.step;
  }

  setStep(value: string){
    this.step = value;
  }

  getCompanyName(){
    return this.companyName;
  }

  setCompanyName(value: string){
    this.companyName = value;
    this.sessionStorage.setItem('company-name', this.companyName);
  }

  getCompanyId(){
    return this.companyId;
  }

  setCompanyId(value: string){
    this.companyId = value;
    this.sessionStorage.setItem('company-id', this.companyId);
  }

  getCheckoutId(){
    return this.checkoutId;
  }

  setCheckoutId(value: string){
    this.checkoutId = value;
    this.sessionStorage.setItem('checkout-id', this.checkoutId);
  }

  getExistingCCToken(){
    return this.existingCCToken;
  }

  setExistingCCToken(value: boolean){
    this.existingCCToken = value;
    this.sessionStorage.setItem('registration-token', this.existingCCToken);
  }

  getExisting(){
    return this.existingInstance;
  }

  setExisting(value: boolean){
    this.existingInstance = value;
    this.sessionStorage.setItem('existing-subscription', this.existingInstance);
  }

  getSubscription(){
    return this.subscription;
  }

  setSubscription(value: string){
    this.subscription = value;
    this.sessionStorage.setItem('blue-subscription', this.subscription);
  }

  getJoinDate(){
    return this.joinDate;
  }

  setJoinDate(value: string){
    this.joinDate = value;
    this.sessionStorage.setItem('subscription-date', this.joinDate);
  }

  getNextBillingDate(){
    return this.nextBillingDate;
  }

  setNextBillingDate(value: string){
    this.nextBillingDate = value;
    this.sessionStorage.setItem('billing-date', this.nextBillingDate);
  }

  getPaymentMethod(){
    return this.paymentMethod;
  }

  setPaymentMethod(value: string){
    this.paymentMethod = value;
    this.sessionStorage.setItem('payment-method', this.paymentMethod);
    if (this.companyBillingProfile) {
      this.companyBillingProfile.paymentMethod = value;
    }
    this.sessionStorage.setItem('company-billing-profile', this.companyBillingProfile);
  }

  getAmount(){
    return this.amount;
  }

  setAmount(value: string){
    this.amount = value;
    this.sessionStorage.setItem('fee-amount', this.amount);
  }

  getCurrency(){
    return this.currency;
  }

  setCurrency(value: string){
    this.currency = value;
  }

  getCompanyBillingProfile() {
    return this.companyBillingProfile;
  }

  setCompanyBillingProfile(profile: any) {
    if (!(profile==null)){ // might need to clean up the info here
 
      var regToken = null;
      if (profile && profile.registrationToken){
        regToken = profile.registrationToken;
      }

      this.companyBillingProfile = { 
          name: profile.name
        , companyId: this.companyId
        , vatNumber: profile.vatNumber
        , registrationToken: regToken
        , paymentMethod: this.paymentMethod
      };
      this.sessionStorage.setItem('company-billing-profile', this.companyBillingProfile);
    }
  }

  prepareCheckout(amount: string, currency: string, customer: string): Observable<any>{
    console.log("this.subscription",this.subscription);
    return this.http.get<any>(this.getCheckoutUrl + "amount=" + amount + "&currency=" + currency + "&customer=" + customer);
  }

  getPaymentResult(checkoutId: string, companyId: string): Observable<any>{
    console.log("getPaymentResult peachId",checkoutId);
    return this.http.get<any>(this.getPayResultUrl + "checkoutId="+checkoutId+"&companyId="+companyId);
  }

  /* we are not using these yet but we will need them for back-office purposes - in the admin app?
  getRefund(transactionId: string): Observable<any>{
    console.log("getRefund peachId",transactionId);
    return this.http.get<any>(this.refundPaymentUrl + transactionId);
  }

  processRecurringPayment(regToken: string): Observable<any>{
    console.log("getRefund peachId",regToken);
    return this.http.get<any>(this.recurrPaymentUrl + regToken);
  }*/

  /* Returns today's date in yyyy-MM-dd format */
  getGregorianDate() {
    var d     = new Date(),
        month = '' + (d.getMonth() + 1),
        day   = '' + d.getDate(),
        year  = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  upsertCompanySubsc(): Observable<any>{

    var request = {"from": this.getGregorianDate(), // must match yyyy-MM-dd format
                   "type": this.subscription,
                   "company": this.companyBillingProfile};

    console.log("upsertCompanySubsc - request",request);
    if (!this.getExisting()){
      return this.http.post(this.companySubscriptionUrl, JSON.stringify(request));
    } else {
      return this.http.put(this.companySubscriptionUrl, JSON.stringify(request));
    }    
  }

  unsubscribe(): Observable<any>{

    console.log("unsubscribe company with companyId ",this.companyId);
    return this.http.put(this.companyUnsubscribeUrl + this.companyId, null);
  }

  getCompanyDetails(): Observable<any>{
    
    console.log("getCompanyDetails for companyId ",this.companyId);
    return this.http.get(this.companyBillingDetails + this.companyId);
    //, {
    //  headers: new HttpHeaders ( {
    //    'Accept': 'text/html, application/xhtml+xml, */*',
    //    'Content-Type': 'application/x-www-form-urlencoded'
    //  }),
    //  responseType: 'text'
    //});
  }

  next(){

    if (this.step === "subscribe" || this.step === "updateSubscriptionAndCC") {
      console.log("step subscribe this.companyBillingProfile",this.companyBillingProfile);
      console.log("step subscribe this.subscription",this.subscription);
      console.log("step subscribe this.paymentMethod",this.paymentMethod);
      if (this.companyBillingProfile && this.subscription && this.paymentMethod) {

        /*** TODO: DB call to get the pricing - do not hardcode pricing here as it could change - must be in DB ***/
        this.currency = "ZAR";
        if (this.subscription === "BLUE_APP_LITE_LICENCE_FEE"){
          this.setAmount("300.00");
        } else if (this.subscription === "BLUE_APP_PLUS_LICENCE_FEE"){
          this.setAmount("500.00");
        } else if (this.subscription === "BLUE_APP_PREMIUM_LICENCE_FEE"){
          this.setAmount("1000.00");
        } else {
          this.setAmount("");
        }
        
        this.upsertCompanySubsc().subscribe(response => {
          console.log("HTTP response for upsertCompanySubsc",response);

          if (this.paymentMethod && this.paymentMethod == "CREDIT_CARD"){
            //only request for a payment if a token does not exist or if the user wants to update the subscription and the Card Details
            if (!this.existingCCToken || this.step === "updateSubscriptionAndCC"){
              // call the checkout API and set the checkout id - then move onto the next step if successful
              this.prepareCheckout(this.amount, this.currency, this.companyName).subscribe(response => {
                console.log("getCheckoutId - Checkout HTTP response",response);
                if (response.id){
                  this.setCheckoutId(response.id);
                  console.log("this.getCheckoutId",this.getCheckoutId());
                  this.checkout();
                }
              }, error => {
                console.log("getCheckoutId - HTTP GET Error",error);
              });
            } else {
              this.viewSubscription();
            }
            
          } else {
            //alert("You chose EFT, one of our staff will contact you shortly etc.");
            this.viewSubscription();
          }
          
        },error =>{
          alert("Error Subscribing!");
        });
        
      }
    } else if (this.step === "unsubscribe") {
      console.log("pay-wizard - this.step: " + this.step);
      this.unsubscribe().subscribe(response => {
        console.log("unsubscribe - HTTP response",response);
        this.clearSubscriptionDetails();
        this.sessionClass.analyseSubscription(null);
        this.viewSubscription();
      }, error => {
        alert("Error on unsuscribe HTTP Call");
        console.log("unsubscribe - HTTP GET Error",error);
      });
    } else if (this.step === "checkout") {
      // fetch the payment result and move onto next step
      console.log("pay-wizard - this.step: " + this.step);
    } else if (this.step === "payment") {
      console.log("pay-wizard - this.step: " + this.step);
    }
  }

  loadSubscriptionDetails(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.sessionClass.loadSubscriptionDetails().then(
        (response) => {
          console.log("response",response);
          this.sessionClass.analyseSubscription(response);
          if (response && response.type) {
            this.setExisting(true);
            this.setSubscription(response.type);
            if (response.nextBillingDate) {
              this.setExistingCCToken(true);
              this.setNextBillingDate(response.nextBillingDate);
            }
            if (response.from) {
              this.setJoinDate(response.from);
            }
          } else {
            console.log("Response - No active subscription exists for " + this.getCompanyName() + "...");
            this.clearSubscriptionDetails();
          }
          resolve(true);
        },
        (err) => {
          this.clearSubscriptionDetails();
          resolve(true);
        }
      );
    });
  }

  checkout() {
    this.dialog.open(CheckoutComponent, {width: '80%', height: 'auto'})
    // this.router.navigateByUrl('/main/payments/checkout');
  }

  viewSubscription(){
    this.router.navigateByUrl('/main/payments/subscribe');
  }

  clearSubscriptionDetails(){
    this.setExisting(false);
    this.setSubscription("");
    this.setExistingCCToken(false);
    this.setNextBillingDate("");
    this.setJoinDate("");
    this.setPaymentMethod("");
  }

  clearStorage(){
    this.currency              = "";
    this.step                  = "";
    this.companyName           = "";
    this.companyId             = "";
    this.subscription          = "";
    this.joinDate              = "";
    this.nextBillingDate       = "";
    this.amount                = "";
    this.paymentMethod         = "";
    this.checkoutId            = "";
    this.paymentId             = "";
    this.existingCCToken       ;
    this.existingInstance   ;
    this.companyBillingProfile = "";

    //subscription-payments relevant keys
    this.sessionStorage.deleteItem('company-id');
    this.sessionStorage.deleteItem('company-name');
    this.sessionStorage.deleteItem('checkout-id');
    this.sessionStorage.deleteItem('registration-token');
    this.sessionStorage.deleteItem('blue-subscription');
    this.sessionStorage.deleteItem('subscription-date');
    this.sessionStorage.deleteItem('billing-date');
    this.sessionStorage.deleteItem('payment-method');
    this.sessionStorage.deleteItem('fee-amount');
    this.sessionStorage.deleteItem('existing-subscription');
    this.sessionStorage.deleteItem('company-billing-profile');
  }

}
