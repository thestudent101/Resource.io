import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { SessionService } from '../shared/session.service';
import { AuthenticationManagementService } from '../authentication-management.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ProfilePictureComponent } from '../shared/profile-picture/profile-picture.component';
import { SessionStorageService } from '../shared/session-storage.service';
import { environment } from 'src/environments/environment';

export interface Section {
    icon: string;
    name: string;
    details: string;
    method: string
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
    username = '';
    userType = '';
    headerName = 'Dashboard'

    profilePicture: any = '/assets/images/user-avatar-default.png';
    profilePictureSubscription: Subscription = new Subscription;

    closeButtonHidden = true;

    hideElements = false;
    showContactsPopup = false;

    navMenus: Section[] = [
        {
            icon: 'dashboard',
            name: 'Dashboard',
            details: '',
            method: '',
        },
        {
            icon: 'people',
            name: 'Contractors',
            details: '',
            method: '',
        },
        {
            icon: 'work',
            name: 'Job Profiles',
            details: '',
            method: '',
        },
        {
            icon: 'credit_card',
            name: 'Manage Payments',
            details: '',
            method: '',
        }
    ];


    @ViewChild(ProfilePictureComponent, { static: false })
  profilePictureView!: ProfilePictureComponent;

    constructor(private sessionClass: SessionService, private authManagementService: AuthenticationManagementService, private router: Router, public snackBar: MatSnackBar, private sessionStorage: SessionStorageService) { }

    ngOnInit() {
        this.username = this.sessionClass.getUsername();
        this.userType = this.sessionClass.getUserType();

        if (this.userType == 'client') {
            this.hideElements = true;
        }
        else {
            this.hideElements = false;
        }
    }

    ngOnDestroy() {
        if (this.profilePictureSubscription) this.profilePictureSubscription.unsubscribe();
    }

    ngAfterViewInit(){
        this.profilePictureSubscription = this.sessionClass.userProfilePic$.subscribe(image => this.profilePictureView.reloadImage())
    }

    openNav() {
        // show closing button
        this.closeButtonHidden = false;

        // if (screen.width <= 450) {
        //     document.getElementById("mySidebar").style.width = "250px";
            // document.getElementById("homeMain").style.marginLeft = "250px";
        // } else {
        //     document.getElementById("mySidebar").style.width = "250px";
        //     document.getElementById("homeMain").style.marginLeft = "250px";
        // }

    }

    get userInitials(): string {
        let profile =  this.sessionStorage.getItem('user-profile');
        if (profile == null || profile.name == null || profile.surname == null) return "BP";
        return profile.name.slice(0,1) + profile.surname.slice(0,1);
    }

    get userEmail(): string {
        return this.sessionStorage.getItem('user-name');
    }

    get privacyPolicyUrl(): string {
        return environment.privacyPolicyUrl;
    }

    closeNav() {
        this.closeButtonHidden = true;
        if (screen.width <= 450) {
          const sideBar:any = document.getElementById("mySidebar");
          sideBar.style.width = "0px";

         const homeMain:any = document.getElementById("homeMain");
         homeMain.style.marginLeft = "0px";
       } else {
         const sideBar:any = document.getElementById("mySidebar");
         sideBar.style.width = "60px";

        const homeMain:any = document.getElementById("homeMain");
        homeMain.style.marginLeft = "60px";
       }

    }

    // switching components click events
    onClickLogout() {
        this.snackBar.open('Loggin out...', '', {
            duration: 2000,
        });
        this.authManagementService.loggedIn = false;
        this.sessionClass.clearStorage();
        this.authManagementService.signOut();
        this.router.navigateByUrl('/landing');
    }

    onClickHelp() {
        this.headerName = 'Help';
        this.router.navigateByUrl('/main/help');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickDashboard() {
        this.headerName = 'Dashboard';
        this.router.navigateByUrl('/main/dashboard');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickContractors() {
        this.headerName = 'Contractors'
        this.router.navigateByUrl('/main/contractors');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickPayments() {
        this.headerName = 'Payments';
        this.router.navigateByUrl('/main/payments');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickNotifications() {
        this.headerName = 'Notifications';
        this.router.navigateByUrl('/main/notifications');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickTerms() {
        this.headerName = 'Terms & Conditions';
        this.router.navigateByUrl('/main/terms-and-conditions');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickJobProfiles() {
        this.headerName = 'Job Profiles';
        this.router.navigateByUrl('/main/job-profiles');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickUserProfile() {
        this.headerName = 'Profile';
        this.router.navigateByUrl('/main/user-profile');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickClientProfile(){
        this.headerName = 'Profile';
        this.router.navigateByUrl('/main/client-profile');
        if (screen.width <= 450) {
            this.closeNav();
        }
    }

    onClickFees() {
        this.headerName = 'Fee Structure';
        this.router.navigateByUrl('/main/fees');
        if (screen.width <= 450) {
            this.closeNav();
        }

    }

    toggleContactsPopup(){
        this.showContactsPopup = !this.showContactsPopup;
    }
}
