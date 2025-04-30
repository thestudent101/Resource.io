import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { PwaService, PwaEvent } from './shared/pwa.service';
import { Subscription } from 'rxjs';
import { ProfilePictureComponent } from './shared/profile-picture/profile-picture.component';
import { SessionService } from './shared/session.service';
import { AuthenticationManagementService } from './authentication-management.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SessionStorageService } from './shared/session-storage.service';
import { environment } from 'src/environments/environment';
import { GoogleAnalyticsService } from './google-analytics.service';
import { PayWizardService } from './modules/payments/pay-wizard.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { LogoutComponent } from './shared/logout/logout.component';
import { MatSidenav } from '@angular/material/sidenav';
declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav!: MatSidenav;

    reason = '';

    close(reason: string) {
      this.reason = reason;
      this.sidenav.close();
    }
    alertVisible: boolean = false;
    isOffline: boolean = true;
    pwaEventSubscription!: Subscription;
    profilePictureSubscription!: Subscription;
    authenticationEventSubscription!: Subscription;
    routerSubscription!: Subscription;
    subscriptionFeeEventSubscription!: Subscription;
    username = '';
    userType = '';
    headerName = 'RESOURCE.IO'
    closeButtonHidden = true;
    showContactsPopup = false;
    sideBarOpen = false;
    isOverlayVisible = false;
    subscriptionFeeOutstanding = false;
    showToolbar = true;
    showFooter = true;
    onlineText: string = "Consultants Online";
    alternateText: string = "Clients Online";
    isAlternate: boolean = false;
    isSmallScreen : boolean = false
    isLargerScreen: boolean = true


    isMobile:boolean = false;





    @ViewChild(ProfilePictureComponent, { static: false }) profilePictureView!: ProfilePictureComponent;
  title: any;
    constructor(private snackBar: MatSnackBar ,private pwaService: PwaService, private sessionService: SessionService, private authManagementService: AuthenticationManagementService, private router: Router, private sessionStorage: SessionStorageService, private googleAnalytics: GoogleAnalyticsService, private payWizardService: PayWizardService, private dialog: MatDialog,private breakpointObserver: BreakpointObserver) {

    }

    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    ngOnInit(): void {
        this.pwaEventSubscription = this.pwaService.pwaEvent$.subscribe(event => this.pwaEventHandler(event));
        this.authenticationEventSubscription = this.authManagementService.authenticationEvent$.subscribe(isAuthenticated => {
            console.log('auth status changed to', isAuthenticated ? "logged in" : 'logged out');
            if (isAuthenticated){
                this.username = this.sessionService.getUsername();
                this.userType = this.sessionService.getUserType();
            } else {

            }
            this.googleAnalytics.emitEvent('auth-status-change', 'auth-events', (isAuthenticated ? "logged in" : 'logged out'), 'auth-status-change', (isAuthenticated ? 1 : 0));
        })

        /* const role = JSON.parse(sessionStorage.getItem('user-type')||'');
        console.log(sessionStorage.getItem('user-type'));
         if (role=== 'contractor') {
            // Redirect contractors to the Contractor Dashboard
            this.router.navigate(['/main/user-profile']);
          } else if (role === 'client') {
            // Redirect clients to the Client Dashboard
            this.router.navigate(['/main/dashboardclient']);
          }

 */
        /*   if (this.isLoggedIn && this.isContractor) {
            // Redirect contractors to the Contractor Dashboard
            this.router.navigate(['/main/user-profile']);
          } */



        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd){
                this.googleAnalytics.emitPageViewEvent(event.urlAfterRedirects);
            }
        });
        this.subscriptionFeeEventSubscription = this.sessionService.subscrFeeEvent$.subscribe(areSubscFeeDue => {
            console.log('subscription fees are ', areSubscFeeDue ? "due" : "up to date");
            if (areSubscFeeDue){
                this.subscriptionFeeOutstanding = true;
            } else {
                this.subscriptionFeeOutstanding = false;
            }
        });
        this.username = this.sessionService.getUsername();
        this.userType = this.sessionService.getUserType();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              if (event.url === '/landing' || event.urlAfterRedirects === '/landing.html') {
                this.showToolbar = true;
                this.showFooter = true;
              } else {
                this.showToolbar = false;
                this.showFooter = false;
              }
            }
        });


        setInterval(() => {
            this.updateOnlineText();
        }, 8000);// Change text every 8 seconds

        this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
            this.isLargerScreen = !result.matches;
        });


    }

    checkIsMobile() {
        this.isMobile = window.innerWidth < 768
    }

    autoCloseMobile() {
        if(this.isMobile) {
            this.close('mobile')
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.checkIsMobile()
    }

    updateOnlineText() {
        this.isAlternate = !this.isAlternate;
        if (this.isAlternate) {
          this.onlineText = this.generateTextWithRandomNumber(this.alternateText);
        } else {
          this.onlineText = this.generateTextWithRandomNumber("Consultants Online");
        }
    }

    generateTextWithRandomNumber(text: string): string {
        const randomNumber = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 10
        return randomNumber.toString() + " " + text;
    }

    ngAfterViewInit(){
        this.profilePictureSubscription = this.sessionService.userProfilePic$.subscribe(() => this.profilePictureView.reloadImage())
    }

    ngOnDestroy(): void {
        if (this.pwaEventSubscription) this.pwaEventSubscription.unsubscribe();
        if (this.profilePictureSubscription) this.profilePictureSubscription.unsubscribe();
        if (this.authenticationEventSubscription) this.authenticationEventSubscription.unsubscribe();
    }

    dismiss(){
        this.alertVisible = false;
    }

    reload(){
        window.location.reload();
    }

    checkForUpdates(){
        this.snackBar.open('Searching for updates...', '', {
            duration:5000,
        });
        this.pwaService.checkForUpdate();
    }

    openNav() {
        // show closing button
        this.closeButtonHidden = false;
        if (screen.width <= 450) {
          const sideBar:any = document.getElementById("mySidebar");
          sideBar.style.width = "250px";
        } else {
          const sideBar:any = document.getElementById("mySidebar");
          sideBar.style.width = "250px";

         const homeMain:any = document.getElementById("homeMain");
         homeMain.style.marginLeft = "250px";
        }
    }

    closeNav() {
        this.closeButtonHidden = true;
        if (!document.getElementById("mySidebar") || !document.getElementById("homeMain")){
            return;
        }
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

    toggleSignupOverlay(){
      this.isOverlayVisible = !this.isOverlayVisible;
    }

    closeSignupOverlay(){
        this.isOverlayVisible = false;
    }


    onMenuItemClicked(headerName: string, route: string){
        this.headerName = headerName;
        this.router.navigateByUrl(route);

    }

    onClickLogout() {
        const logoutRef = this.dialog.open(LogoutComponent);

        logoutRef.afterClosed().subscribe((result:any) => {
            if (result === true) {
                this.authManagementService.loggedIn = false;
                this.sessionService.clearStorage();
                this.payWizardService.clearStorage();
                this.authManagementService.signOut();
                this.router.navigateByUrl('/landing');
            }

        })
    }

    toggleContactsPopup(){
        this.showContactsPopup = !this.showContactsPopup;
    }

    get swAvailable(){
        return this.pwaService.swAvailable();
    }

    get profileComplete(): boolean {
        return this.sessionService.getUserProfileComplete();
    }

    get isLoggedIn(): boolean {
        return this.authManagementService.isLoggedIn();
    }

    get userInitials(): string {
        let profile =  this.sessionStorage.getItem('user-profile');
        if (profile == null || profile.name == null || profile.surname == null) return "BP";
        return profile.name.slice(0,1) + profile.surname.slice(0,1);
    }

    get userEmail(): string {
        return this.sessionStorage.getItem('user-name') || "";
    }

    get privacyPolicyUrl(): string {
        return environment.privacyPolicyUrl;
    }

    get isClient(): boolean {
        return this.sessionService.getUserType() === 'client';

    }

    get isContractor(): boolean {
        return this.sessionService.getUserType() === 'contractor';
    }

    get homeLink(): string {
        if (this.isLoggedIn && this.isClient)
        return '/dashboardclient';

        if (this.isLoggedIn && this.isContractor)
        return '/user-profile';

        return '/landing';
    }

    get versionNumber(): string {
        return environment.versionString;
    }

    private pwaEventHandler(event: PwaEvent) {
        if (event === 'update_available') {
            this.alertVisible = true;
        }
    }

    // Function to check if the current route is the landing page
    isLandingPage(): boolean {
        return this.router.url === '/landing';
       }



}

