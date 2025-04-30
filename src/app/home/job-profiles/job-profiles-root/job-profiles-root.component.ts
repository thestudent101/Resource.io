import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-profiles-root',
  templateUrl: './job-profiles-root.component.html',
  styleUrls: ['./job-profiles-root.component.css']
})
export class JobProfilesRootComponent implements OnInit {
  cancelBtn = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClickAddProfile() {
    this.cancelBtn = true;
    this.router.navigateByUrl('/main/job-profiles/add-job-profile');
  }
  onClickCancel() {
    this.router.navigateByUrl('/main/job-profiles');
    this.cancelBtn = false;
  }
}
