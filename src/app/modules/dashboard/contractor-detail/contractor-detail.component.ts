import { Component, OnInit, OnDestroy } from '@angular/core';
import { PublicContractor } from '../dashboard-models';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorProfile } from 'src/app/shared/user-profile-models';

@Component({
  selector: 'app-contractor-detail',
  templateUrl: './contractor-detail.component.html',
  styleUrls: ['./contractor-detail.component.css']
})
export class ContractorDetailComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription;
    loading = false;
    contractor!: PublicContractor;
    disabled: boolean = false;
    error = false;
    contractorId!: string;

    constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.contractorId = this.route.snapshot.params['contractor']; 
        this.loading = true;
        this.error = false;
        this.dashboardSubscription = this.dashboardService.getContractorDetails(this.contractorId).subscribe(contractor => {
            console.log(contractor);
            this.contractor = contractor
            this.error = false;
            this.loading = false;
        }, error => {
            console.log(error);
            this.error = true;
            this.loading = false;
        });
    }

    ngOnDestroy(){
        if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    }

    get isAuthenticated(): boolean {
        return this.dashboardService.isAuthenticated();
    }

    get hasProfile(): boolean {
        return !this.noProfilesAvailable;
    }

    get noProfilesAvailable(): boolean {
        return (this.contractor === null || this.contractor === undefined);
    }

    get getQualifications() {
        if (this.noProfilesAvailable) return [];
        return this.contractor.qualifications || [];
    }

    get getCertifications() {
        if (this.noProfilesAvailable) return [];
        return this.contractor.certifications || [];
    }

    get getSkills() {
        if (this.noProfilesAvailable) return [];
        return this.contractor.skills || [];
    }
}
