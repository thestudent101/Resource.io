import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContractorProfile } from 'src/app/shared/user-profile-models';
import { BASE_URL } from 'src/app/app.provider';
import { HttpClient } from '@angular/common/http';
import { ClientMatchRequest } from 'src/app/shared/company-profile-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from '../session.service';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

    @Input()
    candidate!: ContractorProfile;
    @Input()
    clientEmail!: string;
    @Input()
    jobIdentifier!: string;
    avatar: string = '/assets/images/user-avatar-default.png';

    disabled: boolean = false;

    workExperienceTotals = 0;
    groupedSkills:any = [];
    sortedSkills:any = [];
    sortedExperience:any = [];
    sortedCertifications:any = [];
    sortedEducation:any = [];

    error = false;
    errorMessage = "";

    constructor(@Inject(BASE_URL) protected baseUrl: string, private router: Router, private http: HttpClient, private snackBar: MatSnackBar, private sessionService: SessionService, private sessionStorage: SessionStorageService) { }

    ngOnInit() {
        this.initValues();
    }

    viewTerms() {
        this.router.navigateByUrl('main/job-profiles/sign-contractor-terms');
    }

    onViewNextSteps() {
        this.logAcceptTerms();
    }

    get isClientUser(): boolean {
        return this.sessionService.getUserType() === 'client'
    }

    get userInitials(): string {
        if (this.candidate.initials != null) return this.candidate.initials;
        if (this.candidate.name == null || this.candidate.surname == null) return "BP";
        return this.candidate.name.slice(0,1) + this.candidate.surname.slice(0,1);
    }

    get userEmail(): string {
        return this.candidate.email;
    }

    get hasProfile(): boolean {
        return !this.noProfilesAvailable;
    }

    get noProfilesAvailable(): boolean {
        return this.candidate === null || this.candidate === undefined;
    }

    get getQualifications() {
        if (this.noProfilesAvailable) return [];
        return this.sortedEducation;
    }

    get getCertifications() {
        if (this.noProfilesAvailable) return [];
        return this.sortedCertifications;
    }

    get getSkills() {
        if (this.noProfilesAvailable) return [];
        return this.sortedSkills;
    }

    get getGroupedSkills() {
        if (this.noProfilesAvailable) return [];
        return this.groupedSkills;
    }

    get getWorkHistory() {
        if (this.noProfilesAvailable) return [];
        return this.sortedExperience;
    }

    get getReferences() {
        if (this.noProfilesAvailable) return [];
        return this.candidate.references || [];
    }

    private logAcceptTerms(){
        let data: ClientMatchRequest = {
            identifier: this.jobIdentifier,
            clientEmail: this.clientEmail,
            candidateNum:this.candidate.candidateNum
        }
        this.error = false;
        this.errorMessage = "";
        this.http.post(this.baseUrl + '/profile/accept-terms', data)
        .subscribe(response => {
            this.snackBar.open('Terms accepted successfully', '', {
                duration: 3000,
            });
            this.router.navigateByUrl('main/job-profiles/next-steps');
        }, error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.error = true;
        })
    }

    private compareDates(d1: number, d2: number, ascending: boolean = false): any {
        let same = (d1 === d2);
        if (same) return 0;
        if (ascending) {
            if (d1 > d2) return 1;
            if (d1 < d2) return -1;
        } else {
            if (d1 < d2) return 1;
            if (d1 > d2) return -1;
        }
    }

    private compareSkills(skill1: string, skill2: string, ascending: boolean = false): any {
        let level1 = this.mapSkillLevels(skill1);
        let level2 = this.mapSkillLevels(skill2);
        let same = level1 === level2;
        if (same) return 0;
        if (ascending) {
            if (level1 > level2) return 1;
            if (level1 < level2) return -1;
        } else {
            if (level1 < level2) return 1;
            if (level1 > level2) return -1;
        }
    }

    private mapSkillLevels(skill: string): number {
        if (!skill) return 0;
        switch (skill.toLowerCase()) {
            case 'expert':
                return 4;
            case 'senior':
                return 3;
            case 'intermediate':
                return 2;
            case 'beginner':
                return 1;
            default:
                return 0;
        }
    }

    private groupBy(key: string, array: any[]): any[] {
        let obj =  array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {})
        return Object.keys(obj).map(function(key) {
            return {key: key,data: obj[key]};
          });
    }
        
    private initValues(){
        this.groupedSkills = this.groupBy('level', this.candidate.skills)
        this.sortedSkills = (this.candidate.skills !== null) ? this.candidate.skills.sort((a, b) => this.compareSkills(a.level, b.level)) : [];
        this.sortedEducation =  (this.candidate.qualifications !== null) ? this.candidate.qualifications.sort((a, b) => this.compareDates(a.attained, b.attained)) : [];
        this.sortedCertifications =  (this.candidate.certifications !== null) ? this.candidate.certifications.sort((a, b) => this.compareDates(a.attained, b.attained)) : [];
        this.sortedExperience =  (this.candidate.workHistory !== null) ? this.candidate.workHistory.sort((a, b) => this.compareDates(a.from, b.from)) : [];
        this.getTotalExperience();
    }

    private getTotalExperience(){
        let lastDate = new Date(this.sortedExperience[0].to || new Date().getTime());
        let firstDate = new Date(this.sortedExperience[this.sortedExperience.length-1].from);
        let months = (12 - firstDate.getMonth()) + (((lastDate.getFullYear()) - (firstDate.getFullYear() + 1)) * 12) + lastDate.getMonth();
        this.workExperienceTotals = months;
    }

    get getYearsOfExperience(): number {
        return Math.floor(this.workExperienceTotals/12);
    }
    get getMonthsOfExperience(): number {
        return this.workExperienceTotals % 12;
    }

    get isUserActive(): boolean {
        return this.sessionStorage.getItem('user-profile-state', 'INCOMPLETE') === 'COMPLETE';
    }
}
