import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from 'src/app/app.provider';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from 'src/app/shared/user-profile-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContractorProfileRepositoryService {

    constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient) { }

    loadProfile(email: string): Observable<UserProfile> {
        return this.http.get<UserProfile>(this.baseUrl + '/profile/contractor', {
            params: {
                emailAddress: email
            }
        });
    }

    createContractorProfile(profile: any): Observable<any> {        
        let body = JSON.stringify(profile);
        return this.http.post(this.baseUrl + '/profile/contractor', body)
    }

    updateContractorProfile(profile: any): Observable<any> {        
        let body = JSON.stringify(profile);
        return this.http.put(this.baseUrl + '/profile/contractor', body)
    }
    
    updateUserProfile(profile: any, emailAddress: any): Observable<any>{
        let options = { params: { 'emailAddress': emailAddress}}
        return this.http.put(this.baseUrl + '/registration/user', JSON.stringify(profile), options);
    }

}
