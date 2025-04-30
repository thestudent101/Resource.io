import { Component, OnInit, Input } from '@angular/core';
import { ContractorProfile, ImageResponse } from 'src/app/shared/user-profile-models';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contractor-card',
    templateUrl: './contractor-card.component.html',
    styleUrls: ['./contractor-card.component.css']
})
export class ContractorCardComponent implements OnInit {

    @Input()
    rank!: number;
    @Input()
    contractorProfile!: ContractorProfile;
    avatar!: string;

    constructor(private sessionClass: SessionService, private router: Router) { }

    ngOnInit() {
    }

    get contractorInitials(): string{
        if (this.contractorProfile.initials != null) return this.contractorProfile.initials;
        if (this.contractorProfile.name == null || this.contractorProfile.surname == null) return "BP";
        return this.contractorProfile.name.slice(0,1) + this.contractorProfile.surname.slice(0,1);
    }

    viewCandidate(candidate: ContractorProfile) {
        this.sessionClass.setCandidate(candidate);
        this.router.navigateByUrl('/main/candidate');
    }
}
