import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContractorProfile } from 'src/app/shared/user-profile-models';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-secure-contractor-detail',
  templateUrl: './secure-contractor-detail.component.html',
  styleUrls: ['./secure-contractor-detail.component.css']
})
export class SecureContractorDetailComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription;
    loading = false;
    candidate!: ContractorProfile;
    disabled: boolean = false;
    error = false;
    contractorId!: string;
    clientEmail!: string;

    constructor(private dashboardService: DashboardService, private sessionService: SessionService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.contractorId = this.route.snapshot.params['contractor']; 
        this.loading = true;
        this.error = false;
        this.clientEmail = this.sessionService.getUsername();
        this.dashboardSubscription = this.dashboardService.getSecureContractorDetails(this.contractorId).subscribe(candidate => {
            console.log(candidate);
            this.candidate = candidate
            this.sessionService.setCandidate(candidate);
            this.sessionService.setCurrentJobDetails("");
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

}
