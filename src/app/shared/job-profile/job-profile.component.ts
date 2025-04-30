import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CompanyJobProfile, Company } from '../company-profile-models';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { SessionService } from '../session.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'detail-job-profile-view',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.css']
})
export class JobProfileComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription
    @Input() jobProfile!: CompanyJobProfile
    processing = false;

    error = false;
    errorMessage = "";
  
    constructor(private dashboardService: DashboardService, private sessionService: SessionService,  private snackBar: MatSnackBar) { }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    }

    get company(): Company {
        if (!this.jobProfile.company) return {
            id: {counter: 0, date:'', machineIdentifier:0, processIdentifier:0, time:'', timeSecond:0, timestamp:0},
            registrationNumber: '',
            name: "This Company"
        }
        return this.jobProfile.company;
    }

    apply(){
        this.processing = true;
        this.error = false;
        this.errorMessage = "";
        let email = this.sessionService.getUsername();
        this.dashboardSubscription = this.dashboardService.applyForJob(this.jobProfile.identifier, email).subscribe(response => {
            this.snackBar.open('Application request received successfully', '', {
                duration: 3000,
            });
            this.processing = false;
        }, error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.error = true;
            this.processing = false;
        })
    }

    get isContractorUser(): boolean {
        return this.sessionService.getUserType() === 'contractor'
    }

    get jobProfileExpired(): boolean {
        return (new Date(this.jobProfile.closingDate) < new Date());
    }

    get isUserActive(): boolean{
        return this.dashboardService.isUserActive();
    }
}
