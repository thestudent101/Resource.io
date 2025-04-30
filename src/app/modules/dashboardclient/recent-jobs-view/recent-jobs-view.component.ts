import { Component, Input } from '@angular/core';
import { Profiles } from 'src/app/shared/job-profile-models';

@Component({
  selector: 'app-recent-jobs-view',
  templateUrl: './recent-jobs-view.component.html',
  styleUrls: ['./recent-jobs-view.component.css']
})
export class RecentJobsViewComponent {
@Input() jobs: Profiles[] = [];
constructor( ) {}
}
