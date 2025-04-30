import { Injectable, Inject } from '@angular/core';
import { BASE_URL } from 'src/app/app.provider';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { SessionService } from 'src/app/shared/session.service';
import { HttpClient } from '@angular/common/http';
import { PublicCompany, PublicJobProfileSummary, PublicJobProfiles, PublicJobProfile, PublicContractors, PublicContractorSummary, PublicContractor, Statistics, Filters, ApiStatistics } from './dashboard-models';
import { map, retry, filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ApiError } from 'src/app/shared/http-error-handler';
import { PaginatedJobOffers, CompanyJobProfile } from 'src/app/shared/company-profile-models';
import { ContractorProfile } from 'src/app/shared/user-profile-models';

@Injectable({
    providedIn: 'root'
})
export class DashboardWebservicesService {

    constructor(@Inject(BASE_URL) private baseUrl: string, private authManagementService: AuthenticationManagementService, private sessionService: SessionService, private http: HttpClient) { }

    getStatistics(): Observable<ApiStatistics> {
        return this.http.get<ApiStatistics>(this.baseUrl + '/public/dashboard-statistics')
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getCompanies(): Observable<PublicCompany[]>{
        return this.http.get<PublicCompany[]>(this.baseUrl + '/public/companies')
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getCompanyJobProfile(companyId: string, page: number = 0, size: number = 10): Observable<PublicJobProfiles>{
        let options = { params: { 'id': companyId, page: page.toString(), size: size.toString()}}
        return this.http.get<PublicJobProfiles>(this.baseUrl + '/public/job-profiles', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getJobProfileDetails(jobProfileId: string): Observable<PublicJobProfile>{
        let options = { params: { 'id': jobProfileId}}
        return this.http.get<PublicJobProfile>(this.baseUrl + '/public/job-profile', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getSecureJobProfileDetails(jobProfileId: string): Observable<CompanyJobProfile>{
        let options = { params: { 'id': jobProfileId}}
        return this.http.get<CompanyJobProfile>(this.baseUrl + '/profile/job-profile-details', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getContractors(skillsFilter: string, qualificationsFilter: string, certificationsFilter: string, experienceFilter: string, page: number, size: number): Observable<PublicContractors>{
        let options = { params: { 'skill': skillsFilter, qualification: qualificationsFilter, certification: certificationsFilter, experience: experienceFilter, page: page.toString(), size: size.toString()}}
        return this.http.get<PublicContractors>(this.baseUrl + '/public/contractors', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getContractorDetails(candidateNumber: string): Observable<PublicContractor>{
        let options = { params: { 'candidateNumber': candidateNumber}}
        return this.http.get<PublicContractor>(this.baseUrl + '/public/contractor', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getSecureContractorDetails(candidateNumber: string): Observable<ContractorProfile> {
        let options = { params: { 'id': candidateNumber}}
        return this.http.get<ContractorProfile>(this.baseUrl + '/profile/contractor-profile', options)
            .pipe(map(response => response))
            .pipe(retry(1));    
    }

    getFilterCategories(): Observable<Filters>{
        return this.http.get<Filters>(this.baseUrl + '/public/details')
        .pipe(map(response => response))
        .pipe(retry(1));    
    }

    applyForJob(identifier: string, candidateEmail: string) {
        let payload = {
            identifier: identifier,
            candidateEmail: candidateEmail
        }
        return this.http.post(this.baseUrl + '/profile/apply-for-job', JSON.stringify(payload))
            .pipe(map(response => response))
            .pipe(retry(1));    
    }
}

