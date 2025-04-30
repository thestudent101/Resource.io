import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicJobProfileSummary, PublicJobProfiles } from '../dashboard-models';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyJobProfile } from 'src/app/shared/company-profile-models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent  implements OnInit, OnDestroy {
    private dashboardSubscription!: Subscription;
    loading = false;
    profiles: any[] = [];
    allJobProfiles: CompanyJobProfile[] = [];
    totalElements!: number;
    pageSize!: number;
    numberOfElements!: number;
    totalPages!: number;
    firstPage!: boolean;
    lastPage!: boolean;
    empty!: boolean;
    pageNumber!: number;

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.fetchPublicData();
    }

    ngOnDestroy(){
        if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    }

    fetchPublicData(page: number = 0, size: number = 10){
        this.loading = true;
        let companyId = this.route.snapshot.params['client'];
        this.profiles = [];
        this.dashboardSubscription = this.dashboardService.getCompanyJobProfile(companyId, page, size).subscribe(profiles => {
            this.profiles = profiles.content
            this.totalElements = profiles.totalElements;
            this.totalPages = profiles.totalPages;
            this.pageSize = profiles.size;
            this.pageNumber = profiles.number;
            this.firstPage = profiles.first;
            this.lastPage = profiles.last;
            this.empty = profiles.empty;
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    pageChanged(event: PageEvent) {
        this.fetchPublicData(event.pageIndex, event.pageSize);
    }

    getJobProfileStatus(profile: PublicJobProfileSummary): string{
        if (!profile) return "Invalid";
        if (new Date(profile.closingDate) > new Date()) return 'Available'
        return 'Expired'
    }

    get noProfilesAvailable(): boolean {
        return this.profiles.length == 0 && !this.loading
    }

    get isLoggedIn(): boolean {
        return this.dashboardService.isAuthenticated();
    }
}
