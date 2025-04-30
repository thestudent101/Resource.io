import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from 'src/app/app.provider';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupUserProfile } from './user-profile-models';
// import { SignupUserProfile } from './user-profile-models'; ipeleng

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {

    constructor(@Inject(BASE_URL) private baseUrl: string, private http: HttpClient) { }

    createClientProfile(clientProfile: any): Observable<any> {
        return this.http.post(this.baseUrl + '/profile/client', clientProfile);
    }

    createContractorProfile(contractorProfile: any): Observable<any> {
        return this.http.post(this.baseUrl + '/profile/contractor', contractorProfile)
    }

    updateClientProfile(clientProfile: any): Observable<any> {
        return this.http.put(this.baseUrl + '/profile/client', clientProfile)
    }

    updateContractorProfile(profileData: any): Observable<any> {
        return this.http.put(this.baseUrl + '/profile/contractor', profileData);
    }

    getCompanyUsers(emailAddress: string): Observable<any>  {
        let options = { params: { 'emailAddress': emailAddress}}
        return  this.http.get(this.baseUrl + '/profile/all-clients', options)
    }

    getCompanyDetails(companyRegistrationNumber: string): Observable<any> {
        let options = { params: { 'companyRegistrationNumber': companyRegistrationNumber}}
        return this.http.get(this.baseUrl + '/profile/get-company', options)
    }

    requestToJoinCompany(profileData: any): Observable<any> {
        return this.http.post(this.baseUrl + '/profile/client-admission', profileData);
    }

    inviteNewUser(postData: any, emailAddress: any): Observable<any>  {
        let options = { params: { 'emailAddress': emailAddress}}
        return this.http.post(this.baseUrl + '/profile/invite-client', JSON.stringify(postData), options);
    }

    createUserProfile(profile: any): Observable<any>{
        return this.http.post(this.baseUrl + '/registration/user', JSON.stringify(profile));
    }

    updateUserProfile(profile: any, emailAddress: string, ): Observable<any>{
        let options = { params: { 'emailAddress': emailAddress}}
        return this.http.put(this.baseUrl + '/registration/user', JSON.stringify(profile), options);
    }

    retrieveUserProfile(emailAddress: string): Observable<SignupUserProfile>{
        let options = { params: { 'emailAddress': emailAddress}}
        return this.http.get<SignupUserProfile>(this.baseUrl + '/registration/user', options);
    }
}