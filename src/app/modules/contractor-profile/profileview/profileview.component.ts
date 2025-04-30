import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/shared/session-storage.service';
import { SessionService } from 'src/app/shared/session.service';
import { ContractorProfileRepositoryService } from '../contractor-profile-repository.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.css']
})
export class ProfileviewComponent implements OnInit {
  user!: any;
  username:string = '';
  error = "";
  isLoading = false;
  userProfile: any = null;
  constructor(private bottomSheet: MatBottomSheet, private snackBar: MatSnackBar, private router: Router, private sessionClass: SessionService, private sessionStorage: SessionStorageService, private contractorProfileRepository: ContractorProfileRepositoryService) { }
  flagProfileScoreLessThan50 = false;
    flagProfileScoreBetween50and70 = false;
    flagProfileScoreBetween70and90 = false;
    flagProfileScoreGreaterThan90 = false;

    colorBlack ='black';
    colorRed = 'red';
    colorOrange = 'orange';
    colorYellow = 'Yellow';
    colorGreen = 'green';

    loadProfile() {
      this.isLoading = true;
      this.contractorProfileRepository.loadProfile(this.username).subscribe(response => {
          this.userProfile = response;  
          this.isLoading = false;
          this.sessionClass.setUserProfile(this.userProfile);  
          this.setProfileScoreColor();        
          this.snackBar.open('Success', '', {
              duration: 3000,
          });
      }, error => {
          console.log(error);
          this.isLoading = false;
          if (error.status == 404){
              this.userProfile = null;
          } else {
              this.error = error.error.message
          }
      })
  }
  get userEmailAddress(): string {
    return this.sessionStorage.getItem('user-name');
}
get userInitials(): string {
    let profile =  this.sessionStorage.getItem('user-profile');
    if (profile == null || profile.name == null || profile.surname == null) return "BP";
    return profile.name.slice(0,1) + profile.surname.slice(0,1);
}
    setProfileScoreColor(){

        console.log("in profile score color");
        

        this.flagProfileScoreLessThan50 = false;
        this.flagProfileScoreBetween50and70 = false;
        this.flagProfileScoreBetween70and90 = false;
        this.flagProfileScoreGreaterThan90 = false;
        var score = this.userProfile.percentageScore;
        if(score < 50)
        {
            this.flagProfileScoreLessThan50 = true;
        }
        else if ((score > 49) && (score < 70))
        {
            
           
            this.flagProfileScoreBetween50and70 = true;  
          
        }
        else if ((score > 69) && (score < 90))
        {
            this.flagProfileScoreBetween70and90 = true;
        }
        else if (score > 89)
        {
            this.flagProfileScoreGreaterThan90;
        }
    }
       
  ngOnInit(): void {

    

    this.username = this.getUsername();  
    this.loadProfile(); 
  }

  private getUsername(): string {
    return this.sessionClass.getUsername();
}

  
}

