import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicJobProfile,PublicJobProfiles } from 'src/app/modules/dashboard/dashboard-models';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { CompanyJobProfile } from 'src/app/shared/company-profile-models';

@Component({
  selector: 'app-job-spec', // Make sure the selector matches your component's selector
  templateUrl: './job-spec.component.html',
  styleUrls: ['./job-spec.component.css']
})
export class JobSpecComponent implements OnInit, OnDestroy {

  private dashboardSubscription!: Subscription;
  loading = false;
  jobProfile!: PublicJobProfile |null ;
  Company!:CompanyJobProfile | null;
  error = false;
    processing!: boolean;
    errorMessage!: string;
    sessionService: any;
    snackBar: any;
    sessionClass: any;

  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.error = false;

    this.route.params.subscribe(params => { // Use params observable to handle dynamic route changes
      const jobId = params['id']; // Use the parameter name defined in your route configuration
      this.dashboardSubscription = this.dashboardService.getJobProfileDetails(jobId).subscribe(profile => {
        this.jobProfile = profile;
        this.loading = false;
        this.error = false;
      }, error => {
        console.log(error);
        this.loading = false;
        this.error = true;
      });
    })

  }


  ngOnDestroy() {
    if (this.dashboardSubscription) {
      this.dashboardSubscription.unsubscribe();
    }
  }



  apply(): void {
    this.errorMessage = "";
    let email = this.sessionService.getUsername();
  
    // Perform a null check on this.jobProfile
    if (this.jobProfile) {
      this.dashboardSubscription = this.dashboardService.applyForJob(this.jobProfile.identifier.toString(), email.toString()).subscribe(
        response => {
          this.snackBar.open('Application request received successfully', '', {
            duration: 3000,
            verticalPosition: "top"
          });
        },
        error => {
          console.error(error);
          this.errorMessage = error.message;
        }
      );
    } else {
      console.error("jobProfile is null or undefined");
    }
  }
  
  

  get noProfilesAvailable(): boolean {
    return this.jobProfile === null || this.jobProfile === undefined;
  }

  get jobProfileExpired(): boolean {
    if (this.noProfilesAvailable || !this.jobProfile?.closingDate) {
      return false;
    }
    return (new Date(this.jobProfile.closingDate) < new Date());
  }
  

  goBack(fromViewJobs: boolean = false) {
    if (fromViewJobs) {
      // If you navigated from "View Jobs", navigate back to that route
      this.router.navigate(['/main/user-profile/view-jobs']);
    } else {
      // Otherwise, navigate back to the Contractor Dashboard
      this.router.navigate(['']);
    }
  }
}
