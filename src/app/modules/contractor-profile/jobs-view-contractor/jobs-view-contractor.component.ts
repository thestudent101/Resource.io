import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { BASE_URL } from 'src/app/app.provider';
import { Component, OnInit, Inject } from '@angular/core';
import { CompanyJobProfile, PaginatedJobOffers } from 'src/app/shared/company-profile-models';
import { Profiles } from 'src/app/shared/job-profile-models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs-view-contractor',
  templateUrl: './jobs-view-contractor.component.html',
  styleUrls: ['./jobs-view-contractor.component.css'],
  animations: [
    trigger('slide', [
      state('applied', style({ left: '0%' })),
      state('saved', style({ left: '50%' })),
      transition('applied <=> saved', animate('300ms ease-out')),
    ]),
  ],
})
export class JobsViewContractorComponent implements OnInit {
  defaultCompanyLogoUrl = '/assets/images/BLUE-Logo-Icon-Large-min.png';
  activeSection = 'applied';
  showApplied = true;
  showSaved = false;
  jobProfiles: Profiles[] = [];
  matchedJobProfiles: CompanyJobProfile[] = [];
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
  profilesData: Profiles[] = [];
  activeJobProfiles: CompanyJobProfile[] = [];
  allJobProfiles!: Profiles;
  jobProfile!: Profiles;

  constructor(
    @Inject(BASE_URL) protected baseUrl: string,
    private http: HttpClient,
    private sessionClass: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch the saved job profiles for the logged-in user
    this.getSavedJobProfiles();
    this.fetchData();
    this.username = this.getUsername();
    // Assign Profiles data to profilesData
    this.jobProfiles = this.sessionClass.getJobDetails(); /* your Profiles data fetching logic here */

    // Get the job profile ID from the route parameters
     this.route.params.subscribe((params: Params) => {
      const jobProfileId = params['id'];

      // Call the backend API to retrieve the job profile by ID
      this.getJobProfileById(jobProfileId);
    });
  }

  getJobProfileById(jobProfileId: string) {
    const apiUrl = `${environment.baseUrl}/profile/job/${jobProfileId}`;

    this.http.get<Profiles>(apiUrl).subscribe(
      (response) => {
        // Handle the successful response here
        this.jobProfile = response;
        console.log('Job profile retrieved successfully:', this.jobProfile);
      },
      (error) => {
        // Handle errors appropriately
        console.error('Error retrieving job profile:', error);
        // You might want to display an error message to the user or perform other error handling actions
        console.log(error);
      }
    );
  }

  populateIsJobSavedProperty() {
    throw new Error('Method not implemented.');
  }

  private getUsername(): string {
    return this.sessionClass.getUsername();
  }

  showSavedJobs() {
    this.activeSection = 'saved';
    this.showApplied = false;
    this.showSaved = true;
    // Fetch saved job profiles for the logged-in user when the "Saved" section is shown
    this.getSavedJobProfiles();
  }

  showAppliedJobs() {
    this.activeSection = 'applied';
    this.showApplied = true;
    this.showSaved = false;
  }

  fetchData(page: number = 0, size: number = 10) {
    this.loading = true;

    this.http.get<PaginatedJobOffers>(this.baseUrl + '/profile/jobs', {
      params: {
        page: page.toString(),
        size: size.toString(),
      },
    }).subscribe(
      (response) => {
        this.jobProfiles = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.pageSize = response.size;
        this.pageNumber = response.number;
        this.firstPage = response.first;
        this.lastPage = response.last;
        this.empty = response.empty;

        // Update matchedJobProfiles with the response conten

        this.loading = false;
        this.isShown = !this.isShown;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.isShown = !this.isShown;
      }
    );
  }


  getButtonStyle(section: string) {
    return { borderBottom: this.activeSection === section ? '9px solid #017DB5' : 'none' };
  }

  getDividerStyle() {
    const marginLeft = this.activeSection === 'applied' ? '0' : '50%';
    return { marginLeft };
  }

  getSavedJobProfiles() {
    this.http.get<CompanyJobProfile[]>(`${this.baseUrl}/profile/saved-job-profile?userId=${this.sessionClass.getUsername()}`).subscribe(
      (response) => {
        this.matchedJobProfiles = response;
      },
      (error) => {
        console.error('Error fetching saved job profiles:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/main/user-profile']);
  }

  viewProfile(jobProfile: Profiles) {
    const jobId = jobProfile.identifier;
    this.router.navigate(['/main/user-profile/job-spec', jobId]) // Ensure this URL matches your route configuration
      .catch(error => {
        console.error('Error navigating to job profile:', error);
      });
  } 

  jobProfileDetailsVisible(jobProfiles: Profiles): boolean {
    // Define your logic here to determine when to display job profile details
    // For example, you can return true if certain conditions are met.
    return true; 
  }
  
}
