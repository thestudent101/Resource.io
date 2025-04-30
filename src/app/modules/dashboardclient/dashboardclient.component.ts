import { Component, Inject, OnInit } from '@angular/core';
import { Statistics } from '../dashboard/dashboard-models';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
import { Profiles } from 'src/app/shared/job-profile-models';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/app/app.provider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-dashboardclient',
  templateUrl: './dashboardclient.component.html',
  styleUrls: ['./dashboardclient.component.css']
})
export class DashboardclientComponent implements OnInit {
  statisticsSubscription!: Subscription;
  statistics!: Statistics;
  loading: boolean = false;
  error: boolean =false;
  jobProfiles: Profiles[] = [];

  private jobProfileEmailUrl = this.baseUrl + '/profile/job?emailAddress=';


  constructor(private dashboardService: DashboardService, @Inject(BASE_URL) protected baseUrl: string,  private http: HttpClient, private sessionClass: SessionService, private snackBar: MatSnackBar) { }

  ngOnInit():void {
    this.getJobProfiles();
  this.statisticsSubscription = this.dashboardService.getStatistics().subscribe(stats => {
    
    this.statistics = stats
    
    this.loading = false;
    this.error = false;
}, error => {
    this.loading = false;
    this.error = true;
});
  }

  getJobProfiles() {
    this.sessionClass.clearProfiles();
    this.http.get<Profiles[]>(this.jobProfileEmailUrl + this.sessionClass.getUsername()).subscribe(response => {
        this.jobProfiles = response;
        this.snackBar.open("Success", '', {
            duration: 3000,
        });
        this.loading = false;
    }, error => {
        this.snackBar.open(error.message, '', {
            duration: 8000,
        });
        this.loading = false;
    });
}

}
