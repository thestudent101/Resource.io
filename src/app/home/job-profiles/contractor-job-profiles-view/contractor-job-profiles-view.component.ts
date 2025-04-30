import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { EndPointDataService } from 'src/app/shared/end-point-data.service';
import { BASE_URL } from 'src/app/app.provider';
import { PaginatedJobOffers, CompanyJobProfile } from 'src/app/shared/company-profile-models';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-contractor-job-profiles-view',
    templateUrl: './contractor-job-profiles-view.component.html',
    styleUrls: ['./contractor-job-profiles-view.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ContractorJobProfilesViewComponent implements OnInit {

    // all jobs endpoint
    private allJobProfilesUrl = this.baseUrl + '/profile/jobs';

    private matchedJobProfilesUrl = this.baseUrl + '/profile/match-jobs?emailAddress=';

    // job profiles object
    allJobProfiles: CompanyJobProfile[] = [];
    matchedJobProfiles: CompanyJobProfile[] = [];
    totalElements!: number;
    pageSize!: number;
    numberOfElements!: number;
    totalPages!: number;
    firstPage: boolean = false;
    lastPage: boolean = false;
    empty: boolean = false;
    pageNumber!: number;

    // 
    isShown = false;
    loading = false;

    jobStep = 1;


    constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private myAuth: AuthenticationManagementService, private sessionClass: SessionService, private router: Router, private dataClass: DataService, private endPoint: EndPointDataService) { }

    ngOnInit() {
        this.fetchData();
        this.facthUserSpecificJobs();
    }

    fetchData(page: number = 0, size: number = 10) {
        this.loading = true;
        this.http.get<PaginatedJobOffers>(this.allJobProfilesUrl, {
            params: {
                page: page.toString(),
                size: size.toString(),
            }
        }).subscribe(response => {
            // assigning data
            this.allJobProfiles = response.content;
            this.totalElements = response.totalElements;
            this.totalPages = response.totalPages;
            this.pageSize = response.size;
            this.pageNumber = response.number;
            this.firstPage = response.first;
            this.lastPage = response.last;
            this.empty = response.empty;
            console.log(this.allJobProfiles);
            this.loading = false;
            this.isShown = !this.isShown;
        }, error => {
            console.log(error);
            this.loading = false;
            this.isShown = !this.isShown;
        });
    }

    // getting 
    facthUserSpecificJobs() {
        this.http.get<CompanyJobProfile[]>(this.matchedJobProfilesUrl + this.sessionClass.getUsername()).subscribe(response => {
            // assigning data
            this.matchedJobProfiles = response;
            console.log(this.matchedJobProfiles);
            this.isShown = !this.isShown;
        }, error => {
            console.log(error);
            this.isShown = !this.isShown;
        });
    }

    // 
    viewProfile(jobProfile: any): void {
        this.sessionClass.setJobDetails(jobProfile);
        this.router.navigateByUrl('main/job-profiles/job-details');
    }

    pageChanged(event: PageEvent) {
        this.fetchData(event.pageIndex, event.pageSize)
    }

    get hasMatchedJobs(): boolean{
        return this.matchedJobProfiles && this.matchedJobProfiles.length > 0;
    }

    setInfoStep(val: number): void {
        this.jobStep = val;
    }
}
