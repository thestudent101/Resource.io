import { Component, OnInit, Inject } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { DataService } from 'src/app/shared/data.service';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/app/app.provider';
import { ContractorProfile } from 'src/app/shared/user-profile-models';
import { Profiles } from 'src/app/shared/job-profile-models';
import { Profile } from 'src/app/modules/contractor-profile/user-profile-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSliderModule} from '@angular/material/slider';

@Component({
    selector: 'app-job-profiles-view',
    templateUrl: './job-profiles-view.component.html',
    styleUrls: ['./job-profiles-view.component.css'],
    

})
export class JobProfilesViewComponent implements OnInit {
    jobProfiles: Profiles[] = [];

    allJobProfiles: Profiles[] = [];

    activeJobProfiles: Profiles[] = [];
    expiredJobProfiles: Profiles[] = [];

    isShown = false;
    loading = true;

    isHidden = true;

    username = '';

    jobStep = 1;
    thumbLabel=false;

    private jobProfileEmailUrl = this.baseUrl + '/profile/job?emailAddress=';
    private jobProfileMatchUrl = this.baseUrl + '/profile/match-contractors?identifier=';
    private contrJobProfile = this.baseUrl + '/profile/match-jobs?emailAddress=';

    constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private custAuth: AuthenticationManagementService, private sessionClass: SessionService, private snackBar: MatSnackBar, private router: Router, private dataClass: DataService) { }

    ngOnInit() {
        this.snackBar.open('Searching...', '', {
            duration: 3000,
        });

        this.username = this.sessionClass.getUserType();

        if (this.sessionClass.getUserType() == 'client') {
            this.getJobProfiles();
            this.dataClass.setData();
        } else {
            this.router.navigateByUrl('/main/job-profiles/contractor-job-profiles');
        }


    }
    formatLabel(value: number): string {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
    
        return `${value}`;
      }

    Ratefilter(data:any) {
    const value = data?.target?.value
     const results:any[] = this.activeJobProfiles.filter((a:any) => a.ratePerHour <= value);
     this.activeJobProfiles = [];
     this.activeJobProfiles.push(...results)  
    }
    onClickAddProfile() {
        this.router.navigateByUrl('/main/job-profiles/add-job-profile').catch((error) => { 
            console.error(error); 
        });
    }
    

    checkDate(profileDate: string | number | Date): boolean {
        let profDate = new Date(profileDate);
        let today = new Date();


        if (profDate < today) {
            return false;
        } else {
            return true;
        }
    }

    // contractors getting their relevant job profiles
    getContractorJobProfiles() {
        this.http.get<Profiles[]>(this.contrJobProfile + this.sessionClass.getUsername()).subscribe(response => {
            this.jobProfiles = response;
            this.snackBar.open("Success", '', {
                duration: 3000,
            });
            this.isShown = !this.isShown;
            this.loading = false;
        }, error => {
            this.isShown = !this.isShown;
            this.loading = false;
        });
    }

    getJobProfiles() {
        this.sessionClass.clearProfiles();
        this.http.get<Profiles[]>(this.jobProfileEmailUrl + this.sessionClass.getUsername()).subscribe(response => {
            this.jobProfiles = response;
            this.splittingJobProfile(this.jobProfiles);
            this.snackBar.open("Success", '', {
                duration: 3000,
            });
            this.isShown = !this.isShown;
            this.loading = false;
        }, error => {
            this.snackBar.open(error.message, '', {
                duration: 8000,
            });
            this.isShown = !this.isShown;
            this.loading = false;
        });
    }

    editProfile(jobProfile: any) {
        this.sessionClass.setCurrentJobProfile(jobProfile);
        this.router.navigateByUrl('/main/job-profiles/add-job-profile').catch((error) => { 
            console.error(error); 
        });
    }
    

    matchedProfiles(identifier: string) {
        this.loading = true;
        this.snackBar.open('Searching for matching candidates', '', {
            duration: 3000,
        });
        this.http.get<ContractorProfile[]>(this.jobProfileMatchUrl + identifier).subscribe(response => {
            console.log(response);
            let message = response.length > 0 ? response.length + " Matches found" : "No matches found"
            this.snackBar.open(message, '', {
                duration: 3000,
            });
            this.sessionClass.setCurrentJobDetails(identifier);
            this.sessionClass.setJobProfileMatch(response);
            this.router.navigateByUrl('/main/job-profiles/match-job-profile');
        }, error => {
            this.snackBar.open(error.message, '', {
                duration: 8000,
            });
        });
    }

    splittingJobProfile(jobProfiles: Profiles[]): void {

        let profDate = new Date();
        let today = new Date();

        for (let jobProfile of jobProfiles) {
             profDate = new Date(jobProfile.closingDate);
            
            if (profDate < today) {
                this.expiredJobProfiles.push(jobProfile);
            } else {
                this.activeJobProfiles.push(jobProfile);
                
            }
        }
        
    }

    setStep(val: number): void {
        this.jobStep = val;
    }



    /*Delete(identifier: string) {
        // Logic to delete the job profile with the given identifier
        // Implement the desired functionality here
        console.log('Deleting job profile with identifier:', identifier);
    }*/
    Delete(identifier: string) {
        this.http.delete(this.baseUrl + '/profile/job/' + identifier).subscribe(
          () => {
            console.log('Job profile deleted successfully');
            // Perform any additional actions after successful deletion
          },
          (error) => {
            console.error('Error deleting job profile:', error);
            // Handle the error appropriately
          }
        );
      }
       
}
