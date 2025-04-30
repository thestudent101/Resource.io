import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/shared/user-profile-models';

@Component({
    selector: 'app-job-profiles-match',
    templateUrl: './job-profiles-match.component.html',
    styleUrls: ['./job-profiles-match.component.css']
})
export class JobProfilesMatchComponent implements OnInit {

    contractorProfiles: any[] = [];

    constructor(private sessionClass: SessionService, private router: Router) { }

    ngOnInit() {
        this.contractorProfiles = this.sessionClass.getJobProfileMatch();
    }

    goBack() {
        this.router.navigateByUrl('main/job-profiles');
    }

    get noMatchesFound(): boolean {
        return this.contractorProfiles && this.contractorProfiles.length == 0;
    }

    get noDataExists(): boolean {
        return this.contractorProfiles === null || this.contractorProfiles === undefined;
    }
}
