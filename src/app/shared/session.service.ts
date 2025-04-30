import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../app.provider';
import { Observable, Subject } from 'rxjs';
import { ImageResponse, SuccessResponse, ImageUpload, UserProfile, ContractorProfile } from './user-profile-models';
import { SessionStorageService } from './session-storage.service';



@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private username = "";
  private cellnumber = "";
  private userType = "";
  private userProfileComplete = false;
  private jobDetails: any;
  private userProfilePic!: ImageResponse;
  private userProfilePicSubject: Subject<ImageResponse> = new Subject<ImageResponse>();
  private subscrFeeSubject: Subject<boolean> = new Subject<boolean>();
  userProfilePic$: Observable<ImageResponse>
  subscrFeeEvent$ = this.subscrFeeSubject.asObservable();

  userProfile: any;
  jobProfiles: any;
  currentJobProfile: any;
  currentJobProfileDetails: any;

  jobProfileMatches: any;

  candidate!: ContractorProfile;

  _data: any;

  private contractorRegistrationUrl = this.baseUrl + '/profile/contractor?emailAddress=';
  private clientRegistrationUrl = this.baseUrl + '/profile/client?emailAddress=';
  private uploadProfilePicUrl = this.baseUrl + '/profile/upload-image';
  private getProfilePicUrl = this.baseUrl + '/profile/get-image';
  private getActiveSubscriptionUrl  = this.baseUrl + '/billing/company-active-subscription?companyId=';

  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private router: Router, private sessionStorage: SessionStorageService ) { 
      this.userProfilePic$ = this.userProfilePicSubject.asObservable();
      let uname = this.sessionStorage.getItem('user-name');
      let utype = this.sessionStorage.getItem('user-type');
      let cnumber   = this.sessionStorage.getItem('cell-number');
      let candidate = this.sessionStorage.getItem('current-candidate');
      let profileMatch = this.sessionStorage.getItem('current-profile-match');
      let profiledetails = this.sessionStorage.getItem('current-profile-details');
      let userProfile = this.sessionStorage.getItem('user-profile');
      this.userProfileComplete = this.sessionStorage.getItem('user-profile-complete', false);
      if (uname !== null) this.username = uname;
      if (utype !== null) this.userType = utype;
      if (cnumber !== null) this.cellnumber  = cnumber;
      if (candidate !== null) this.candidate = candidate;
      if (profileMatch !== null) this.jobProfileMatches = profileMatch;
      if (profiledetails !== null) this.currentJobProfileDetails = profiledetails;
      if (userProfile !== null) this.userProfile = userProfile;
      console.log('userType', this.userType || 'public');
  }

  setUserProfileComplete(){
      this.userProfileComplete = true;
      this.sessionStorage.setItem('user-profile-complete', true);
  }

  setUserProfileIncomplete(){
      this.userProfileComplete = false;
      this.sessionStorage.setItem('user-profile-complete', false);
  }

  getUserProfileComplete(): boolean {
      return this.userProfileComplete;
  }


  setJobProfileMatch(jobProfMatch: any) {
      this.jobProfileMatches = jobProfMatch;
      this.sessionStorage.setItem('current-profile-match', jobProfMatch);
      this.sessionStorage.deleteItem('current-candidate');
  }

  getJobProfileMatch() {
      return this.jobProfileMatches;
  }

  setCandidate(candidate: ContractorProfile) {
      this.candidate = candidate;
      this.sessionStorage.setItem('current-candidate', candidate);
  }

  getCandidate(): ContractorProfile {
      return this.candidate;
  }

  // set and get username
  setUsername(uName: string) {
      this.username = uName;
      this.sessionStorage.setItem('user-name', uName);
  }
  getUsername(): string {
      return this.username;
  }

  // set and get cellnumber
  setCellnumber(cNumber: string) {
      this.cellnumber = cNumber;
      this.sessionStorage.setItem('cell-number', cNumber);
  }
  getCellnumber(): string {
      return this.cellnumber;
  }

  // set and get userType
  setUserType(uType: string) {
      this.userType = uType;
      this.sessionStorage.setItem('user-type', uType);
  }
  getUserType() {
      return this.userType;
  }

  setUserProfile(uProfile:any) {
      this.userProfile = uProfile;
      this.sessionStorage.setItem('user-profile', uProfile);
  }
  getUserProfile() {
      return this.userProfile;
  }

  setJobProfile(jProfiles:any) {
      this.jobProfiles = jProfiles;
  }
  getJobProfile() {
      return this.jobProfiles
  }

  clearCurrentJobProfile(){
      this.currentJobProfile = null;
  }

  setCurrentJobProfile(cJobProfile:any) {
      this.currentJobProfile = cJobProfile;
  }
  getCurrentJobProfile() {
      return this.currentJobProfile;
  }

  setJobDetails(jobDetails: any) {
      this.jobDetails = jobDetails;
  }

  getJobDetails(): any {
      return this.jobDetails;
  }

  setCurrentJobDetails(jobDetails:any) {
      this.currentJobProfileDetails = jobDetails;
      this.sessionStorage.setItem('current-profile-details', jobDetails);
  }

  getCurrentJobDetails(): any {
      return this.currentJobProfileDetails;
  }

  clearCurrentCandidate(){
      this.sessionStorage.deleteItem('current-candidate');
  }

  clearProfiles(){
      this.sessionStorage.deleteItem('current-candidate');
      this.sessionStorage.deleteItem('current-profile-match');
      this.sessionStorage.deleteItem('current-profile-details');
  }

  clearStorage(){
      this.userType = "";
      this.username = "";
      this.cellnumber = "";
      this.sessionStorage.deleteItem('user-name');
      this.sessionStorage.deleteItem('cell-number');
      this.sessionStorage.deleteItem('user-type');
      this.sessionStorage.deleteItem('current-candidate');
      this.sessionStorage.deleteItem('current-profile-match');
      this.sessionStorage.deleteItem('current-profile-details');
      this.sessionStorage.deleteItem('user-profile');
      this.sessionStorage.deleteItem('user-profile-complete');
  }

  loadContractorProfile() {
      return Observable.create((observer:any) => { 
          this.http.get(this.contractorRegistrationUrl + this.username).subscribe(response => {
              this._data = response;
              this.setUserProfile(response);
              this.setUserType('contractor');
              observer.next('true');
              this.router.navigate(['/main/user-profile']);
          }, error => {
              console.error(error);
              observer.error(error);
          });
      });
  }

  loadClientProfile() {
      return Observable.create((observer:any) => {
          this.http.get(this.clientRegistrationUrl + this.username).subscribe(response => {
              this._data = response;
              this.setUserProfile(response);
              this.setUserType('client');
              if (this.userType === "client"){
                  if (this.getUserProfile().companyId) {
                      this.loadSubscriptionDetails().then(
                          (response) => {
                              this.analyseSubscription(response);                               
                          },
                          (err) => {
                              this.triggerSubscriptionFeeUpdateEvent(false);
                          }
                      );
                  }
              }
              observer.next('true');
              this.router.navigateByUrl('/main/dashboardclient');
          }, error => {
              console.log(error);
              observer.error(error);
          });
      });
  }


  uploadProfilePicture(emailAddress: string, file: File): Promise<SuccessResponse> {
      return new Promise(async (resolve, reject) => {
          if (file == null) reject();
          const uploadPayload = await this.getImageUploadFromFile(file);
          this.http.post<SuccessResponse>(this.uploadProfilePicUrl, uploadPayload, {
              params: {
                  emailAddress: emailAddress,
              }
          }).subscribe(response => resolve(response), error => reject(error));
      });
      
  }

  getProfilePicture(emailAddress: string): Promise<ImageResponse> {
      return new Promise((resolve, reject) => {
          return this.http.get<ImageResponse>(this.getProfilePicUrl, {
              params: {
                  emailAddress: emailAddress
              }
          }).subscribe(response => {
              this.userProfilePic = response;
              resolve(response)
          }, error => reject(error));
      });
  }   

  triggerImageUpdate(){
      this.userProfilePicSubject.next(this.userProfilePic);
  }

  triggerSubscriptionFeeUpdateEvent(state: boolean){
      this.subscrFeeSubject.next(state);
  }

  private async getImageUploadFromFile(file: File): Promise<ImageUpload> {
      return {
          fileName: file.name,
          contentType: file.type,
          imageFile: await this.toBase64(file)
      }
  }

  private toBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
      });
      
  }

  getActiveSubscr(): Observable<any>{
      console.log("getActiveSubscr - companyId",this.getUserProfile().companyId);
      return this.http.get<any>(this.getActiveSubscriptionUrl + this.getUserProfile().companyId);
  }
      

  loadSubscriptionDetails(): Promise<any> {
      return new Promise<any>(async (resolve, reject) => {
        this.getActiveSubscr().subscribe(response => {
          resolve(response);      
        }, error => {
          console.log("Error - Billing Profile " + this.getUserProfile().companyName + " does not exist");
          reject(error);
        });
      });
  }

  analyseSubscription(subscription: any){
      if(subscription && subscription.type && subscription.nextBillingDate){
          var billDate = new Date(subscription.nextBillingDate);
          var currDate = new Date();

          if (billDate < currDate){
              this.triggerSubscriptionFeeUpdateEvent(true);
          } else {
              this.triggerSubscriptionFeeUpdateEvent(false);
          }
      } else if (subscription && subscription.type && !subscription.nextBillingDate){
          this.triggerSubscriptionFeeUpdateEvent(true);
      } else {
          this.triggerSubscriptionFeeUpdateEvent(false);
      }
  }
  
}