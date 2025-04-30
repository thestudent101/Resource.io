import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { SignupUserProfile } from '../../onboarding-wizard/user-profile-models';
import { SessionStorageService } from 'src/app/shared/session-storage.service';


@Component({
    selector: 'app-public-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

    userProfile!: SignupUserProfile ;
    error = "";
    userProfileSubscription!: Subscription;
    authenticationSubscription!: Subscription;
    loading: boolean = false;

    constructor(private dataService: DataService, private authManagementService: AuthenticationManagementService, private dashboardService: DashboardService, private sessionStorage: SessionStorageService) { }

    ngOnInit() {
        this.authenticationSubscription = this.authManagementService.authenticationEvent$.subscribe(isAuthenticated => this.authenticatedStateHandler(isAuthenticated));
        this.authenticatedStateHandler(this.authManagementService.loggedIn);
    }

    ngOnDestroy() {
        if (this.authenticationSubscription) this.authenticationSubscription.unsubscribe();
        if (this.userProfileSubscription) this.userProfileSubscription.unsubscribe();
    }

    authenticatedStateHandler(isAuthenticated: boolean){
        if (isAuthenticated){
            this.dataService.setData();
            this.dashboardService.getUserState().subscribe(userProfile => {
                this.sessionStorage.setItem('user-profile-state', userProfile.status);
                this.userProfile = userProfile
            }, error => {
                this.error = error
            });
        }
    }

    get isContractorProfileIncomplete(): boolean {
        return this.userProfile && this.userProfile.type === 'CONTRACTOR' && this.userProfile.status !== 'COMPLETE';
    }

    get isClientProfileIncomplete(): boolean {
        return this.userProfile && this.userProfile.type === 'CLIENT' && this.userProfile.status !== 'COMPLETE';
    }

}
