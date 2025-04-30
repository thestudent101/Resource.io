import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyJobProfile, PaginatedJobOffers } from 'src/app/shared/company-profile-models';
import { environment } from 'src/environments/environment';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { BASE_URL } from 'src/app/app.provider';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session.service';


@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {

  defaultCompanyLogoUrl = '/assets/images/BLUE-Logo-Icon-Large-min.png';
  
  allJobProfiles: CompanyJobProfile[] = [];
  displayedJobProfiles: CompanyJobProfile[] = [];

  @ViewChild('titleSearchInput', { static: false }) titleSearchInput!: ElementRef;
  @ViewChild('locationSearchInput', { static: false }) locationSearchInput!: ElementRef;

  loading = false;
  username = '';

  private allJobProfilesUrl = `${environment.baseUrl}/profile/jobs`;

  constructor(
    private http: HttpClient,
    private myAuth: AuthenticationManagementService,
    private sessionClass: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.getUsername();
    this.fetchData();
  }

  fetchData(page: number = 0, size: number = 10) {
    this.loading = true;

    this.http.get<PaginatedJobOffers>(this.allJobProfilesUrl, {
      params: {
        page: page.toString(),
        size: size.toString(),
      }
    }).subscribe(response => {
      this.allJobProfiles = response.content;
      this.displayedJobProfiles = this.allJobProfiles;

      this.loading = false;
    }, error => {
      console.log(error);
      this.loading = false;
    });
  }

  searchJobs() {
    const titleSearchText = this.titleSearchInput.nativeElement.value.toLowerCase();
    const locationSearchText = this.locationSearchInput.nativeElement.value.toLowerCase();

    this.displayedJobProfiles = this.allJobProfiles.filter(jobProf => {
      const titleMatch = jobProf.title.toLowerCase().includes(titleSearchText);
      const locationMatch = jobProf.jobLocation.toLowerCase().includes(locationSearchText);
      return titleMatch && locationMatch;
    });
  }

  resetFilters() {
    this.titleSearchInput.nativeElement.value = '';
    this.locationSearchInput.nativeElement.value = '';
    this.displayedJobProfiles = this.allJobProfiles;
  }

  private getUsername(): string {
    return this.sessionClass.getUsername();
  }

  goBack() {
    // Use the router to navigate to the Contractor Dashboard path
    this.router.navigate(['']);
  }


  toggleJobSavedStatus(jobProfile: any) {
    const userId = this.getUsername();
    const jobProfileId = jobProfile.identifier;
    const apiEndpoint = `${environment.baseUrl}/profile/saved-job-profile`;

    if (jobProfile.isJobSaved) {
      const deleteApiEndpoint = `${environment.baseUrl}/profile/saved-job-profile/${userId}/${jobProfileId}`;

      this.http.delete(deleteApiEndpoint).subscribe(
        () => {
          jobProfile.isJobSaved = false;
        },
        (error) => {
          console.error('Error removing job from saved jobs:', error);
        }
      );
    } else {
      const savedJobData = {
        userId: userId,
        jobProfileId: jobProfileId
      };

      this.http.post(apiEndpoint, savedJobData).subscribe(() => {
        jobProfile.isJobSaved = true;
      }, (error) => {
        console.error('Error saving job to saved jobs:', error);
      });
    }
  }

  viewProfile(jobProfile: CompanyJobProfile) {
    // Extract the job ID from the jobProf object (assuming there's a property like 'id')
    const jobId = jobProfile.identifier;
  
    // Use the router to navigate to the 'job-spec' route with the job ID as a parameter
    this.router.navigate(['/main/user-profile/job-spec', jobId]);
  }

  viewAllJobs() {
    this.router.navigate(['/main/user-profile/view-jobs']); // Navigate to ViewJobsComponent
  }


 
}