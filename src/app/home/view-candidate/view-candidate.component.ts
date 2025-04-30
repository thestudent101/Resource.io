import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';
import { ContractorProfile } from 'src/app/shared/user-profile-models';

@Component({
    selector: 'app-view-candidate',
    templateUrl: './view-candidate.component.html',
    styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {

    candidate!: ContractorProfile;
    clientEmail!: string;
    jobIdentifier!: string;
    disabled: boolean = false;

    constructor(private sessionClass: SessionService, private router: Router) { }

    ngOnInit() {
        this.candidate = this.sessionClass.getCandidate();
        this.jobIdentifier = this.sessionClass.getCurrentJobDetails();
        this.clientEmail = this.sessionClass.getUsername();
    }

    goBack() {
        this.sessionClass.clearCurrentCandidate();
        this.router.navigateByUrl('main/job-profiles/match-job-profile');
    }

    get noProfilesAvailable(): boolean {
        return this.candidate === null || this.candidate === undefined;
    }

}
