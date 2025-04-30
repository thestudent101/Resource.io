import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobProfile: any;

  constructor(private sessionClass: SessionService, private router: Router) { }

  ngOnInit() {
    this.jobProfile = this.sessionClass.getJobDetails();
  }

  goBack() {
    this.router.navigateByUrl('main/job-profiles');
  }

}
