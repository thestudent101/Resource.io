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
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  reason = '';
  close(reason: string) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "close", 29, 4, Date.now());
      this.reason = reason;
      this.sidenav.close();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "close", 32, 5, Date.now());
    }
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
  headerName = 'RESOURCE.IO';
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
  isSmallScreen: boolean = false;
  isLargerScreen: boolean = true;
  isMobile: boolean = false;
  @ViewChild(ProfilePictureComponent, {
    static: false
  })
  profilePictureView!: ProfilePictureComponent;
  title: any;
  constructor(private snackBar: MatSnackBar, private pwaService: PwaService, private sessionService: SessionService, private authManagementService: AuthenticationManagementService, private router: Router, private sessionStorage: SessionStorageService, private googleAnalytics: GoogleAnalyticsService, private payWizardService: PayWizardService, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "constructor", 65, 4, Date.now());
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "constructor", 67, 5, Date.now());
    }
  }
  scrollToSection(sectionId: string) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "scrollToSection", 69, 4, Date.now());
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "scrollToSection", 74, 5, Date.now());
    }
  }
  ngOnInit(): void {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "ngOnInit", 76, 4, Date.now());
      this.pwaEventSubscription = this.pwaService.pwaEvent$.subscribe(event => this.pwaEventHandler(event));
      this.authenticationEventSubscription = this.authManagementService.authenticationEvent$.subscribe(isAuthenticated => {
        console.log('auth status changed to', isAuthenticated ? "logged in" : 'logged out');
        if (isAuthenticated) {
          this.username = this.sessionService.getUsername();
          this.userType = this.sessionService.getUserType();
        } else {}
        this.googleAnalytics.emitEvent('auth-status-change', 'auth-events', isAuthenticated ? "logged in" : 'logged out', 'auth-status-change', isAuthenticated ? 1 : 0);
      });

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
        if (event instanceof NavigationEnd) {
          this.googleAnalytics.emitPageViewEvent(event.urlAfterRedirects);
        }
      });
      this.subscriptionFeeEventSubscription = this.sessionService.subscrFeeEvent$.subscribe(areSubscFeeDue => {
        console.log('subscription fees are ', areSubscFeeDue ? "due" : "up to date");
        if (areSubscFeeDue) {
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
      }, 8000); // Change text every 8 seconds

      this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe(result => {
        this.isLargerScreen = !result.matches;
      });
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "ngOnInit", 145, 5, Date.now());
    }
  }
  checkIsMobile() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "checkIsMobile", 147, 4, Date.now());
      this.isMobile = window.innerWidth < 768;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "checkIsMobile", 149, 5, Date.now());
    }
  }
  autoCloseMobile() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "autoCloseMobile", 151, 4, Date.now());
      if (this.isMobile) {
        this.close('mobile');
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "autoCloseMobile", 155, 5, Date.now());
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "onResize", 157, 4, Date.now());
      this.checkIsMobile();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "onResize", 160, 5, Date.now());
    }
  }
  updateOnlineText() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "updateOnlineText", 162, 4, Date.now());
      this.isAlternate = !this.isAlternate;
      if (this.isAlternate) {
        this.onlineText = this.generateTextWithRandomNumber(this.alternateText);
      } else {
        this.onlineText = this.generateTextWithRandomNumber("Consultants Online");
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "updateOnlineText", 169, 5, Date.now());
    }
  }
  generateTextWithRandomNumber(text: string): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "generateTextWithRandomNumber", 171, 4, Date.now());
      const randomNumber = Math.floor(Math.random() * 20) + 1; // Generate a random number between 1 and 10
      return randomNumber.toString() + " " + text;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "generateTextWithRandomNumber", 174, 5, Date.now());
    }
  }
  ngAfterViewInit() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "ngAfterViewInit", 176, 4, Date.now());
      this.profilePictureSubscription = this.sessionService.userProfilePic$.subscribe(() => this.profilePictureView.reloadImage());
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "ngAfterViewInit", 178, 5, Date.now());
    }
  }
  ngOnDestroy(): void {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "ngOnDestroy", 180, 4, Date.now());
      if (this.pwaEventSubscription) this.pwaEventSubscription.unsubscribe();
      if (this.profilePictureSubscription) this.profilePictureSubscription.unsubscribe();
      if (this.authenticationEventSubscription) this.authenticationEventSubscription.unsubscribe();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "ngOnDestroy", 184, 5, Date.now());
    }
  }
  dismiss() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "dismiss", 186, 4, Date.now());
      this.alertVisible = false;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "dismiss", 188, 5, Date.now());
    }
  }
  reload() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "reload", 190, 4, Date.now());
      window.location.reload();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "reload", 192, 5, Date.now());
    }
  }
  checkForUpdates() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "checkForUpdates", 194, 4, Date.now());
      this.snackBar.open('Searching for updates...', '', {
        duration: 5000
      });
      this.pwaService.checkForUpdate();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "checkForUpdates", 199, 5, Date.now());
    }
  }
  openNav() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "openNav", 201, 4, Date.now());
      // show closing button
      this.closeButtonHidden = false;
      if (screen.width <= 450) {
        const sideBar: any = document.getElementById("mySidebar");
        sideBar.style.width = "250px";
      } else {
        const sideBar: any = document.getElementById("mySidebar");
        sideBar.style.width = "250px";
        const homeMain: any = document.getElementById("homeMain");
        homeMain.style.marginLeft = "250px";
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "openNav", 214, 5, Date.now());
    }
  }
  closeNav() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "closeNav", 216, 4, Date.now());
      this.closeButtonHidden = true;
      if (!document.getElementById("mySidebar") || !document.getElementById("homeMain")) {
        return;
      }
      if (screen.width <= 450) {
        const sideBar: any = document.getElementById("mySidebar");
        sideBar.style.width = "0px";
        const homeMain: any = document.getElementById("homeMain");
        homeMain.style.marginLeft = "0px";
      } else {
        const sideBar: any = document.getElementById("mySidebar");
        sideBar.style.width = "60px";
        const homeMain: any = document.getElementById("homeMain");
        homeMain.style.marginLeft = "60px";
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "closeNav", 234, 5, Date.now());
    }
  }
  toggleSignupOverlay() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "toggleSignupOverlay", 236, 4, Date.now());
      this.isOverlayVisible = !this.isOverlayVisible;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "toggleSignupOverlay", 238, 5, Date.now());
    }
  }
  closeSignupOverlay() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "closeSignupOverlay", 240, 4, Date.now());
      this.isOverlayVisible = false;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "closeSignupOverlay", 242, 5, Date.now());
    }
  }
  onMenuItemClicked(headerName: string, route: string) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "onMenuItemClicked", 245, 4, Date.now());
      this.headerName = headerName;
      this.router.navigateByUrl(route);
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "onMenuItemClicked", 249, 5, Date.now());
    }
  }
  onClickLogout() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "onClickLogout", 251, 4, Date.now());
      const logoutRef = this.dialog.open(LogoutComponent);
      logoutRef.afterClosed().subscribe((result: any) => {
        if (result === true) {
          this.authManagementService.loggedIn = false;
          this.sessionService.clearStorage();
          this.payWizardService.clearStorage();
          this.authManagementService.signOut();
          this.router.navigateByUrl('/landing');
        }
      });
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "onClickLogout", 264, 5, Date.now());
    }
  }
  toggleContactsPopup() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "toggleContactsPopup", 266, 4, Date.now());
      this.showContactsPopup = !this.showContactsPopup;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "toggleContactsPopup", 268, 5, Date.now());
    }
  }
  get swAvailable() {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "swAvailable", 270, 4, Date.now());
      return this.pwaService.swAvailable();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "swAvailable", 272, 5, Date.now());
    }
  }
  get profileComplete(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "profileComplete", 274, 4, Date.now());
      return this.sessionService.getUserProfileComplete();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "profileComplete", 276, 5, Date.now());
    }
  }
  get isLoggedIn(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "isLoggedIn", 278, 4, Date.now());
      return this.authManagementService.isLoggedIn();
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "isLoggedIn", 280, 5, Date.now());
    }
  }
  get userInitials(): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "userInitials", 282, 4, Date.now());
      let profile = this.sessionStorage.getItem('user-profile');
      if (profile == null || profile.name == null || profile.surname == null) return "BP";
      return profile.name.slice(0, 1) + profile.surname.slice(0, 1);
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "userInitials", 286, 5, Date.now());
    }
  }
  get userEmail(): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "userEmail", 288, 4, Date.now());
      return this.sessionStorage.getItem('user-name') || "";
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "userEmail", 290, 5, Date.now());
    }
  }
  get privacyPolicyUrl(): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "privacyPolicyUrl", 292, 4, Date.now());
      return environment.privacyPolicyUrl;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "privacyPolicyUrl", 294, 5, Date.now());
    }
  }
  get isClient(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "isClient", 296, 4, Date.now());
      return this.sessionService.getUserType() === 'client';
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "isClient", 299, 5, Date.now());
    }
  }
  get isContractor(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "isContractor", 301, 4, Date.now());
      return this.sessionService.getUserType() === 'contractor';
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "isContractor", 303, 5, Date.now());
    }
  }
  get homeLink(): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "homeLink", 305, 4, Date.now());
      if (this.isLoggedIn && this.isClient) return '/dashboardclient';
      if (this.isLoggedIn && this.isContractor) return '/user-profile';
      return '/landing';
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "homeLink", 313, 5, Date.now());
    }
  }
  get versionNumber(): string {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "versionNumber", 315, 4, Date.now());
      return environment.versionString;
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "versionNumber", 317, 5, Date.now());
    }
  }
  private pwaEventHandler(event: PwaEvent) {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "pwaEventHandler", 319, 4, Date.now());
      if (event === 'update_available') {
        this.alertVisible = true;
      }
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "pwaEventHandler", 323, 5, Date.now());
    }
  }

  // Function to check if the current route is the landing page
  isLandingPage(): boolean {
    const __devpulse_id = Date.now();
    try {
      __devpulse_trace("FUNCTION_ENTRY", "app.component.ts", "isLandingPage", 326, 4, Date.now());
      return this.router.url === '/landing';
    } finally {
      __devpulse_trace("FUNCTION_EXIT", "app.component.ts", "isLandingPage", 328, 8, Date.now());
    }
  }
}