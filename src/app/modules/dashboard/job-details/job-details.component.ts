import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicJobProfile } from '../dashboard-models';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription;
    loading = false;
    jobProfile!: PublicJobProfile;
    disabled = false;
    jobId!: string;
    companyId!: string;
    error = false;

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        console.log(this.route.snapshot.params);
        this.jobId = this.route.snapshot.params['job'];
        this.companyId = this.route.snapshot.params['client'];
        this.loading = true;
        this.error = false;
        this.dashboardSubscription = this.dashboardService.getJobProfileDetails(this.jobId).subscribe(profile => {
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

    get jobProfileExpired(): boolean {
        return !this.noProfilesAvailable && (new Date(this.jobProfile.closingDate) < new Date());
    }
}
