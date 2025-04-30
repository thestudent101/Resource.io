import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session.service';
import { HttpClient } from '@angular/common/http';
import { CompanyJobProfile, PaginatedJobOffers } from 'src/app/shared/company-profile-models';
import { environment } from 'src/environments/environment';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { JobProfileComponent } from 'src/app/shared/job-profile/job-profile.component'; // Import the shared component
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from 'src/app/app.provider';

@Component({
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.css']
})
export class ContractorDashboardComponent implements OnInit {

  defaultCompanyLogoUrl = '/assets/images/BLUE-Logo-Icon-Large-min.png';
   
  private allJobProfilesUrl = this.baseUrl + '/profile/jobs';
  private matchedJobProfilesUrl = this.baseUrl + '/profile/match-jobs?emailAddress=';

  allJobProfiles!: CompanyJobProfile[];
  matchedJobProfiles!: CompanyJobProfile[];
  totalElements!: number;
  pageSize!: number;
  numberOfElements!: number;
  totalPages!: number;
  firstPage!: boolean;
  lastPage!: boolean;
  empty!: boolean;
  pageNumber!: number;

  isShown = false;
  loading = false;
  username = '';
  userEmail = '';

  constructor(
    @Inject(BASE_URL) protected baseUrl: string,
    private http: HttpClient,
    private myAuth: AuthenticationManagementService,
    private sessionClass: SessionService,
    private router: Router
    
  ) { }

  ngOnInit() {
    this.fetchData();
    this.username = this.getUsername();
    this.getSavedJobProfiles();
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
      this.totalElements = response.totalElements;
      this.totalPages = response.totalPages;
      this.pageSize = response.size;
      this.pageNumber = response.number;
      this.firstPage = response.first;
      this.lastPage = response.last;
      this.empty = response.empty;

      this.getMatchedJobProfiles();

      this.loading = false;
      this.isShown = !this.isShown;
    }, error => {
      console.log(error);
      this.loading = false;
      this.isShown = !this.isShown;
    });
  }

  getMatchedJobProfiles() {
    const userId = this.username;
    const matchedJobProfilesUrl = `${this.baseUrl}/profile/match-jobs?emailAddress=${userId}`;

    this.http.get<CompanyJobProfile[]>(matchedJobProfilesUrl).subscribe(
      (response) => {
        this.matchedJobProfiles = response;
        this.populateIsJobSavedProperty();
      },
      (error) => {
        console.error('Error fetching matched job profiles:', error);
      }
    );
  }

  

  isJobSavedForJob(job: CompanyJobProfile): boolean {
    return this.matchedJobProfiles.some(savedJob => savedJob.identifier === job.identifier);
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

  getSavedJobProfiles() {
    const userId = this.username;
    const savedJobProfilesUrl = `${environment.baseUrl}/profile/saved-job-profile?userId=${userId}`;
  
    this.http.get<CompanyJobProfile[]>(savedJobProfilesUrl).subscribe(
      (response) => {
        this.matchedJobProfiles = response;
        this.populateIsJobSavedProperty();
      },
      (error) => {
        console.error('Error fetching saved job profiles:', error);
      }
    );
  }
  
  populateIsJobSavedProperty() {
    const savedJobIds = this.matchedJobProfiles.map((jobProfile) => jobProfile.identifier);
  
    this.allJobProfiles.forEach((jobProf) => {
      jobProf.isJobSaved = savedJobIds.includes(jobProf.identifier);
    });
  }
  

  private getUsername(): string {
    return this.sessionClass.getUsername();
  }

  

  viewProfile(jobProfile: CompanyJobProfile) {
    // Extract the job ID from the jobProf object (assuming there's a property like 'id')
    const jobId = jobProfile.identifier;
  
    // Use the router to navigate to the 'job-spec' route with the job ID as a parameter
    this.router.navigate(['/main/user-profile/job-spec', jobId]);
  }
  

  viewAllJobs() {
    // Use the router to navigate to the 'view-jobs' route
    this.router.navigate(['/main/user-profile/view-jobs']);
  }




}
