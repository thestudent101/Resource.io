import { Component, OnInit, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { PublicCompany } from '../dashboard-models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-client-view',
    templateUrl: './client-view.component.html',
    styleUrls: ['./client-view.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ClientViewComponent implements OnInit, OnDestroy {
    private dashboardSubscription!: Subscription;
    loading = false;
    companies: PublicCompany[] = [];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.loading = true;
        this.dashboardSubscription = this.dashboardService.getCompanies().subscribe(companies => {
            this.companies = companies
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    ngOnDestroy(){
        if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
    }
    
    get isAuthenticated(): boolean {
        return this.dashboardService.isAuthenticated();
    }
}
