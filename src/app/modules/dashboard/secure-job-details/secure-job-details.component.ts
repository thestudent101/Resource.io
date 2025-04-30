import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyJobProfile } from 'src/app/shared/company-profile-models';

@Component({
  selector: 'app-secure-job-details',
  templateUrl: './secure-job-details.component.html',
  styleUrls: ['./secure-job-details.component.css']
})
export class SecureJobDetailsComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription;
    loading = false;
    jobProfile!: CompanyJobProfile;
    disabled = false;
    jobId!: string;
    companyId!: string;
    error = false;

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.jobId = this.route.snapshot.params['job'];
        this.companyId = this.route.snapshot.params['client'];
        this.loading = true;
        this.error = false;
        this.dashboardSubscription = this.dashboardService.getSecureJobProfileDetails(this.jobId).subscribe(profile => {
            this.jobProfile = profile
            this.loading = false;
            this.error = false;
        }, error => {
            console.log(error);
            this.loading = false;
            this.error = true;
        });
    }

    ngOnDestroy(){
        if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    }

    get noProfilesAvailable(): boolean {
        return this.jobProfile === null || this.jobProfile === undefined;
    }
}
