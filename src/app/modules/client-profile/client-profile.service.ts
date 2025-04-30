import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session.service';
import { BASE_URL } from 'src/app/app.provider';
import { ClientProfile } from './client-profile-models';


@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  private inviteUserUrl = this.baseUrl + '/profile/invite-client?emailAddress=';
  private getCompanyUsersUrl = this.baseUrl + '/profile/all-clients?emailAddress=';
  private getRequestedUsersUrl = this.baseUrl + '/profile/accept-invite?emailAddress=';
  private approveClientRequestsUrl = this.baseUrl + '/profile/client-approval';
  private clientProfileUrl = this.baseUrl + '/profile/client?emailAddress=';
  private updateClientUrl = this.baseUrl + '/profile/client?emailAddress=';
  private createClientUrl = this.baseUrl + '/profile/client';

  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private sessionClass: SessionService) { }

  createClientProfile(clientProfileForm: any){
    return this.http.post(this.createClientUrl, clientProfileForm)
  }
  
  updateClientProfile(clientProfileForm: any){
    return this.http.put(this.updateClientUrl + this.sessionClass.getUsername(), clientProfileForm)
  }

  loadProfile(): Observable<ClientProfile> {
    return this.http.get<ClientProfile>(this.clientProfileUrl + this.sessionClass.getUsername())
  }

  getCompanyUsers(): Observable<any>  {
    return this.http.get(this.getCompanyUsersUrl + this.sessionClass.getUsername())
  }

  getRequestedUsers(): Observable<any>  {
    return this.http.get(this.getRequestedUsersUrl + this.sessionClass.getUsername())
  }
  
  inviteNewUser(email: string, name: string): Observable<any>  {
    var postData = {
      userName: name,
      userEmail: email
    }
    return this.http.post(this.inviteUserUrl + this.sessionClass.getUsername(), JSON.stringify(postData))
  }

  approveClientRequest(companyName: string, companyRegistrationNumber: string): Observable<any> {
    var postData = {
        userEmail: this.sessionClass.getUsername(),
        companyName: companyName,
        companyRegistrationNumber: companyRegistrationNumber
    }
    return this.http.post(this.approveClientRequestsUrl , JSON.stringify(postData))
  }
}
