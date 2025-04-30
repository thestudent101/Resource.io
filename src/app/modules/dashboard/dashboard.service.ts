import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardWebservicesService } from './dashboard-webservices.service';
import { Statistics, PublicCompany, PublicJobProfiles, PublicJobProfile, PublicContractors, PublicContractor, Filters, ApiStatistics } from './dashboard-models';
import { map } from 'rxjs/operators';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { ContractorProfile } from 'src/app/shared/user-profile-models';
import { CompanyJobProfile } from 'src/app/shared/company-profile-models';
import { UserManagementService } from '../onboarding-wizard/user-management.service';
import { SignupUserProfile } from '../onboarding-wizard/user-profile-models';
import { SessionService } from 'src/app/shared/session.service';
import { SessionStorageService } from 'src/app/shared/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private webservice: DashboardWebservicesService, private authManagementService: AuthenticationManagementService, private userManagementService: UserManagementService, private sessionService: SessionService, private sessionStorage: SessionStorageService) { }

    private mappedStatistics(stats: ApiStatistics): Statistics{
        let statistics: Statistics = {
            totalClients: stats.totalNumberOfCompanies,
            totalCompanies: stats.totalNumberOfCompanies,
            totalContractors: stats.totalNumberOfContractors,
            totalJobProfiles: stats.totalNumberOfJobProfiles,
            totalYearsOfExperience: stats.totalYearsOfExperience,
            totalUniqueContractorSkills: stats.totalNumberOfUniqueSkills,
            totalOfflineContractors: 722,
            totalHoursSold: 30125,
            summarySeniorContractors: {
                total: stats.totalNumberOfSeniorContractors,
                ratePerHour: stats.averageRateOfSeniorContractors,
                
            },
            summaryIntermediateContractors:  {
                total: stats.totalNumberOfIntermediateContractors,
                ratePerHour: stats.averageRateOfIntermediateContractors
            },
            summaryJuniorContractors:  {
                total: stats.totalNumberOfJuniorContractors,
                ratePerHour: stats.averageRateOfJuniorContractors
            },
            topSkills: stats.skillsCount,
        }
        return statistics;
    }

    getStatistics(): Observable<Statistics> {
        return this.webservice.getStatistics().pipe(map(stats => {
            return this.mappedStatistics(stats);
        }))
    }

    getCompanies(): Observable<PublicCompany[]>{
        return this.webservice.getCompanies() 
    }

    getCompanyJobProfile(companyId: string, page: number = 0, size: number = 10): Observable<PublicJobProfiles>{
        return this.webservice.getCompanyJobProfile(companyId, page, size) 
    }

    getJobProfileDetails(jobProfileId: string): Observable<PublicJobProfile>{
        return this.webservice.getJobProfileDetails(jobProfileId) 
    }

    getSecureJobProfileDetails(jobProfileId: string): Observable<CompanyJobProfile>{
        return this.webservice.getSecureJobProfileDetails(jobProfileId);
    }

    getContractors(skillsFilter: string, qualificationsFilter: string, certificationsFilter: string, experienceFilter: string, page: number, size: number): Observable<PublicContractors>{
        return this.webservice.getContractors(skillsFilter,qualificationsFilter,certificationsFilter,experienceFilter, page, size) 
    }

    getContractorDetails(contractorId: string): Observable<PublicContractor>{
        return this.webservice.getContractorDetails(contractorId) 
    }

    getSecureContractorDetails(candidateNumber: string): Observable<ContractorProfile>{
        return this.webservice.getSecureContractorDetails(candidateNumber);
    }

    getFilterCategories(): Observable<Filters>{
        return this.webservice.getFilterCategories();
    }

    applyForJob(identifier: string, candidateEmail: string){
        return this.webservice.applyForJob(identifier, candidateEmail);
    }

    isAuthenticated(): boolean {
        return this.authManagementService.isLoggedIn();
    }

    getUserState(): Observable<SignupUserProfile>{
        let userEmail = this.sessionService.getUsername();
        return this.userManagementService.retrieveUserProfile(userEmail)
    }

    isUserActive(): boolean {
        return this.sessionStorage.getItem('user-profile-state', 'INCOMPLETE') === 'COMPLETE';
    }
}