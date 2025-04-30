import { Component, OnInit } from '@angular/core';

import { PayWizardService } from '../pay-wizard.service';
import { SessionService } from 'src/app/shared/session.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSubscriptionDialogComponent } from '../dialogs/confirm-subscription-dialog/confirm-subscription-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmCancelDialogComponent } from '../dialogs/confirm-cancel-dialog/confirm-cancel-dialog.component';
import { SessionStorageService } from 'src/app/shared/session-storage.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})


export class SubscribeComponent implements OnInit {

  errorMessage!: string;
  isLoading!: boolean;
  userMessage!: string;
  registrationToken!: string;

  subscriptionForm!: FormGroup;

  constructor( private payWizardService: PayWizardService, private sessionClass: SessionService, public dialog: MatDialog, public storage: SessionStorageService ) {}

  ngOnInit(): void {
   
    this.payWizardService.setStep("subscribe");
    this.userMessage = "No Subscription found.";
    this.isLoading    = true;
    this.subscriptionForm = new FormGroup({
      subscriptionRadio: new FormControl("BLUE_APP_PREMIUM_LICENCE_FEE")
    });

    this.payWizardService.setExisting(false);
    this.payWizardService.setExistingCCToken(false);
    this.payWizardService.setCompanyName(this.sessionClass.getUserProfile().company.name);
    this.payWizardService.setCompanyId(this.sessionClass.getUserProfile().companyId);
    
    this.payWizardService.loadSubscriptionDetails().then(
      (val) => {
        console.log("this.payWizardService.loadSubscriptionDetails().then - val: ",val);
        this.payWizardService.getCompanyDetails().subscribe(response => {
          console.log("getCompanyPaymentMethd - Check HTTP response",response);
          if (response){
            if (response.paymentMethod){
              this.payWizardService.setPaymentMethod(response.paymentMethod);
            }
            if (response.token){
              this.registrationToken = response.token;
            }
          }
          this.init2();
        }, error => {
          console.log("getCompanyPaymentMethd - HTTP GET Error",error);
          this.init2();
        });
      }
    );
  }

  init2(){
    console.log("profile: ",this.sessionClass.getUserProfile().company);
    this.payWizardService.setCompanyBillingProfile(this.sessionClass.getUserProfile().company);
    var jsonObj = this.payWizardService.getCompanyBillingProfile();
    if (jsonObj && this.registrationToken){
      jsonObj["registrationToken"] = this.registrationToken;
    }
    console.log("Call payWizardService.setCompanyBillingProfile(jsonObj) with jsonObj:",jsonObj);
    this.payWizardService.setCompanyBillingProfile(jsonObj);
    if (!this.payWizardService.getExisting()){
      // get Client Profile Company details
      console.log("this.sessionClass",this.sessionClass);
      this.userMessage = "No active Subscription exists for " + this.payWizardService.getCompanyName();
    } else {
      if (this.payWizardService.getSubscription()) {       
        this.subscriptionRadio.setValue(this.payWizardService.getSubscription());
        this.subscriptionRadio.updateValueAndValidity();
        this.userMessage = "Current Subscription for " + this.payWizardService.getCompanyName() + " is " + this.subscription;
      } else {
        this.userMessage = "No active Subscription exists for " + this.payWizardService.getCompanyName();
      }
    }
    this.isLoading = false;
    console.log("Subscribe on init2 - this.payWizardService", this.payWizardService);
  }

  subscribeDialog(): void {
    console.log("subscribeDialog with radio button value as ",this.subscriptionRadio.value);

    const dialogRef = this.dialog.open(ConfirmSubscriptionDialogComponent, {
      width: 'auto',
      data: {name: this.subscriptionRadio.value}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The subscribeDialog was closed - result',result);
      if (result && result.subscribe == "Y"){
        if (result.paymentType){
          this.payWizardService.setPaymentMethod(result.paymentType);
          console.log("pick radio button",this.subscriptionForm.value);
          if (this.subscriptionForm.value && this.subscriptionRadio.value){
            this.payWizardService.setSubscription(this.subscriptionRadio.value);
            this.payWizardService.setJoinDate(this.payWizardService.getGregorianDate());// set join date as today's date in gregorian format
            if (result.updateCreditCard){// if it is first subscription this won't be set so the step will be subscribe
              this.payWizardService.setStep("updateSubscriptionAndCC");
            }
            this.payWizardService.next();
          } else {
            alert("Error picking up your subscription choice!");
          }
        }
      }
    });
  }

  get subscriptionRadio(): FormControl{
    return this.subscriptionForm.get("subscriptionRadio") as FormControl;
  }

  cancelSubscriptionDialog(): void {
    console.log("cancelSubscriptionDialog");

    const dialogRef = this.dialog.open(ConfirmCancelDialogComponent, {
      width: 'auto',
      data: {name: null}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The cancelSubscriptionDialog was closed - result',result);
      if (result && result.unsubscribe == "Y"){
        this.payWizardService.setStep("unsubscribe");
        this.payWizardService.next();
      }
    });
  }

  get licence(): string {
    var subscr = this.payWizardService.getSubscription();

    // clean that up in future
    if (subscr == "BLUE_APP_LITE_LICENCE_FEE"){
      return "Blue Lite";
    }
    else if (subscr == "BLUE_APP_PLUS_LICENCE_FEE"){
      return "Blue Plus";
    }
    else if (subscr == "BLUE_APP_PREMIUM_LICENCE_FEE"){
      return "Blue Premium";
    } else 
    {
      return "";
    }
    //return this.payWizardService.getSubscription();
  }

  get companyName(): string {
    return this.payWizardService.getCompanyName();
  }

  get paymentMethod(): string {
    var paymentMethod = this.payWizardService.getPaymentMethod();
    if (paymentMethod == "CREDIT_CARD"){
      paymentMethod = "Credit Card";
    }
    return paymentMethod;
    //return this.payWizardService.getPaymentMethod();
  }

  get joinDate(): string {
    return this.payWizardService.getJoinDate();
  }

  get nextBillingDate(): string {
    return this.payWizardService.getNextBillingDate();
  }

  get subscription(): string {
    return this.payWizardService.getSubscription();
  }

}