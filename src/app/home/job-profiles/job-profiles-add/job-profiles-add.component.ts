import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { SessionService } from 'src/app/shared/session.service';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BASE_URL } from 'src/app/app.provider';
import { CompanyJobProfile } from 'src/app/shared/company-profile-models';
import { MatSnackBar } from '@angular/material/snack-bar';


// interfaces
export interface Skills {
    description: string;
}
export interface Qualifications {
    description: string;
}
export interface Certifications {
    description: string;
}
export interface PersonalityTraits {
    description: string;
}
export interface Responsibilities {
    description: string;
}
export interface Offers {
    description: string;
}

@Component({
    selector: 'app-job-profiles-add',
    templateUrl: './job-profiles-add.component.html',
    styleUrls: ['./job-profiles-add.component.css']
})
export class JobProfilesAddComponent implements OnInit {
    //
    errorText = "";
    // 
    jobDescription = "";
    empEquity = "";
    jobTitle = "";
    closingDate = '';
    workExperienceInYears = null;
    jobLocation = '';
    ratePerHour = null;

    identifier = '';

    snackMessage = '';

    createdBy = "";

    contractDurationInMonths = null;

    jobProfileUrl = this.baseUrl + '/profile/job';
    updateJobProfUrl = this.baseUrl + '/profile/job';


    qualificationControl = new FormControl();
    filteredQualifications!: Observable<string[]>;

    certificationControl = new FormControl();
    filteredCertifications!: Observable<string[]>;

    skillControl = new FormControl();
    filteredSkills!: Observable<string[]>;
    // 
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    saveButtonDisabled = false;

    // 
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    // carry all the required skills
    skills: Skills[] = [];

    // carry all the required qualifications
    qualifications: Qualifications[] = [];

    // carry all the required certifications
    certs: Certifications[] = [];

    // carry all the required certifications
    personalityTraits: PersonalityTraits[] = [];

    // carry all the required certifications
    responsibilities: Responsibilities[] = [];

    // carry all the required certifications
    offers: Offers[] = [];

    _data: any;

    postData = {
        identifier: this.identifier,
        title: this.jobTitle,
        closingDate: this.closingDate,
        description: this.jobDescription,
        workExperienceInYears: this.workExperienceInYears,
        jobLocation: this.jobLocation,
        ratePerHour: this.ratePerHour,
        employmentEquity: this.empEquity,
        personalityTraits: this.personalityTraits,
        responsibilities: this.responsibilities,
        skills: this.skills,
        qualifications: this.qualifications,
        certifications: this.certs,
        offers: this.offers,
        createdBy: this.createdBy,
        contractDurationInMonths: this.contractDurationInMonths
    };

    updateData = {
        identifier: this.identifier,
        title: this.jobTitle,
        closingDate: this.closingDate,
        description: this.jobDescription,
        workExperienceInYears: this.workExperienceInYears,
        jobLocation: this.jobLocation,
        ratePerHour: this.ratePerHour,
        employmentEquity: this.empEquity,
        personalityTraits: this.personalityTraits,
        responsibilities: this.responsibilities,
        skills: this.skills,
        qualifications: this.qualifications,
        certifications: this.certs,
        offers: this.offers,
        createdBy: this.createdBy,
        contractDurationInMonths: this.contractDurationInMonths
    };

    newJobProfile = true;
    currentJobProfile: any;

    allQualifications: any;
    allCcertificates: any;
    allSkills: any;

    jobStep = 1;

    @ViewChild('qualificationInput', { static: false })
    qualificationInput!: ElementRef<HTMLInputElement>;
    @ViewChild('auto', { static: false })
    matAutocomplete!: MatAutocomplete;

    @ViewChild('certificationInput', { static: false })
    certificationInput!: ElementRef<HTMLInputElement>;
    @ViewChild('certAuto', { static: false })
    certMatAutocomplete!: MatAutocomplete;

    @ViewChild('skillInput', { static: false })
    skillInput!: ElementRef<HTMLInputElement>;
    @ViewChild('skillAuto', { static: false })
    skilltMatAutocomplete!: MatAutocomplete;



    constructor(@Inject(BASE_URL) protected baseUrl: string,  private CustAuth: AuthenticationManagementService, private http: HttpClient, private sessionClass: SessionService, private snackBar: MatSnackBar, private router: Router, private dataClass: DataService) {
       
    }

    ngOnInit() {
        if (this.sessionClass.getCurrentJobProfile() != null) {
            this.newJobProfile = false;
            this.currentJobProfile = this.sessionClass.getCurrentJobProfile();
            this.assignValues();
        }
        this.allQualifications = this.dataClass.getQualifications() || [];
        this.allCcertificates = this.dataClass.getCertificates() || [];
        this.allSkills = this.dataClass.getSkills() || [];
        this.setupFilteredLists();
    }

    ngOnDestroy(){
        console.log('closing');
        this.newJobProfile = true;
        this.currentJobProfile = null;
        this.sessionClass.clearCurrentJobProfile();
    }

    private setupFilteredLists(){
        this.filteredQualifications = this.qualificationControl.valueChanges.pipe(
            startWith(null),
            map((qualification: string | null) => qualification ? this._filterQualifications(qualification) : this.allQualifications.slice()));

        this.filteredCertifications = this.certificationControl.valueChanges.pipe(
            startWith(null),
            map((certification: string | null) => certification ? this._filterCertifications(certification) : this.allQualifications.slice()));

        this.filteredSkills = this.skillControl.valueChanges.pipe(
            startWith(null),
            map((skill: string | null) => skill ? this._filterSkills(skill) : this.allSkills.slice()));
    }

    private _filterQualifications(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allQualifications.filter((qualification: string) =>
            qualification.toLowerCase().includes(filterValue)
        );
    }

    private _filterCertifications(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allCcertificates.filter((certification: string) =>
            certification.toLowerCase().includes(filterValue)
        );
    }

    private _filterSkills(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allSkills.filter((skill: string) =>
            skill.toLowerCase().includes(filterValue)
        );
    }

    // -------------- adding and removing skills -----------------------

    addSkill(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our skill
        if ((value || '').trim()) {
            this.skills.push({ description: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeSkill(skill: Skills): void {
        const index = this.skills.indexOf(skill);

        if (index >= 0) {
            this.skills.splice(index, 1);
        }
    }

    selectedSkill(event: MatAutocompleteSelectedEvent) {
        this.skills.push({ description: event.option.viewValue });
        this.skillInput.nativeElement.value = '';
        this.skillControl.setValue(null);
    }

    // -------------- adding and removing personality traits -----------------------

    addPersonalityTrait(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our skill
        if ((value || '').trim()) {
            this.personalityTraits.push({ description: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removePersonalityTrait(personalityTrait: PersonalityTraits): void {
        const index = this.personalityTraits.indexOf(personalityTrait);

        if (index >= 0) {
            this.personalityTraits.splice(index, 1);
        }
    }

    // -------------- adding and removing responsibility -----------------------

    addResponsibility(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our skill
        if ((value || '').trim()) {
            this.responsibilities.push({ description: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeResponsibility(responsibility: Responsibilities): void {
        const index = this.responsibilities.indexOf(responsibility);

        if (index >= 0) {
            this.responsibilities.splice(index, 1);
        }
    }

    // -------------- adding and removing qualifications -----------------------

    addQualification(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our qualification
        if ((value || '').trim()) {
            this.qualifications.push({ description: value.trim() });
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.qualificationControl.setValue(null);
    }

    removeQualification(qualification: Qualifications): void {
        const index = this.qualifications.indexOf(qualification);

        if (index >= 0) {
            this.qualifications.splice(index, 1);
        }
    }

    selectedQualification(event: MatAutocompleteSelectedEvent) {
        this.qualifications.push({ description: event.option.viewValue });
        this.qualificationInput.nativeElement.value = '';
        this.qualificationControl.setValue(null);
    }

    // -------------- adding and removing certifications -----------------------

    addCertificate(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our cert
        if ((value || '').trim()) {
            this.certs.push({ description: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
        this.certificationControl.setValue(null);
    }

    removeCertificate(cert: Certifications): void {
        const index = this.certs.indexOf(cert);

        if (index >= 0) {
            this.certs.splice(index, 1);
        }
    }

    selectedCertification(event: MatAutocompleteSelectedEvent) {
        this.certs.push({ description: event.option.viewValue });
        this.certificationInput.nativeElement.value = '';
        this.certificationControl.setValue(null);
    }

    // -------------- adding and removing offers -----------------------

    addOffer(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our cert
        if ((value || '').trim()) {
            this.offers.push({ description: value.trim() });
        }
        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    removeOffer(offer: Offers): void {
        const index = this.offers.indexOf(offer);

        if (index >= 0) {
            this.offers.splice(index, 1);
        }
    }
    // ------------------------ validate job profile ------------------------------

    
    private jobProfileValid(): boolean {
        if (this.isJobProfileValid) {
            this.errorText = "";
            return true;
        } else {
            this.errorText = "Required field are incompleted"
            return false;
        }
    }

    get isJobProfileValid(): boolean{
        const valid = !!this.jobTitle && !!this.jobDescription && !!this.ratePerHour && !!this.closingDate && !!this.jobLocation;
        return valid;
    }
    
    get hasErrors():boolean {
        return this.errorText.length > 0;
    }

    // ------------------------ save job profile ------------------------------

    onClickSaveJobProfile() {
        if (!this.jobProfileValid()) return;
        if (this.saveButtonDisabled) return;
        this.saveButtonDisabled = true;
        if (!this.newJobProfile) this.postData.identifier = this.identifier;
        this.postData.title = this.jobTitle;
        this.postData.closingDate = this.closingDate;
        this.postData.workExperienceInYears = this.workExperienceInYears;
        this.postData.jobLocation = this.jobLocation;
        this.postData.ratePerHour = this.ratePerHour;
        this.postData.createdBy = this.sessionClass.getUsername();
        this.postData.description = this.jobDescription;
        this.postData.employmentEquity = this.empEquity;
        this.postData.personalityTraits = this.personalityTraits;
        this.postData.responsibilities = this.responsibilities;
        this.postData.skills = this.skills;
        this.postData.qualifications = this.qualifications;
        this.postData.certifications = this.certs;
        this.postData.offers = this.offers;
        this.postData.contractDurationInMonths = this.contractDurationInMonths;
        let body = JSON.stringify(this.postData);
        if (this.newJobProfile == true) {
            this.http.post(this.jobProfileUrl, body).subscribe(response => {
                this._data = response;
                this.snackBar.open(this._data.message, '', {
                    duration: 2000,
                });
                this.saveButtonDisabled = false;
                this.router.navigateByUrl('/main/job-profiles');
                this.onClickCancel();
            }, error => {
                console.log(error)
                this.saveButtonDisabled = true;
                this.errorText = error.message;
            })
        } else {
            this.http.put(this.updateJobProfUrl, body).subscribe(response => {
                this._data = response;
                this.snackBar.open(this._data.message, '', {
                    duration: 2000,
                });
                this.saveButtonDisabled = false;
                this.router.navigateByUrl('/main/job-profiles');
                this.onClickCancel();
            }, error => {
                console.log(error)
                this.saveButtonDisabled = false;
                this.errorText = error.message;
            });
        }

    }

    onClickCancel() {
        this.router.navigateByUrl('/main/job-profiles');
        this.newJobProfile = true;
        this.saveButtonDisabled = false;
    }

    assignValues() {
        this.identifier = this.currentJobProfile.identifier;
        this.jobTitle = this.currentJobProfile.title;
        this.closingDate = this.currentJobProfile.closingDate;
        this.jobDescription = this.currentJobProfile.description;
        this.workExperienceInYears = this.currentJobProfile.workExperienceInYears;
        this.jobLocation = this.currentJobProfile.jobLocation;
        this.ratePerHour = this.currentJobProfile.ratePerHour;
        this.empEquity = this.currentJobProfile.employmentEquity;
        this.personalityTraits = this.currentJobProfile.personalityTraits;
        this.responsibilities = this.currentJobProfile.responsibilities;
        this.skills = this.currentJobProfile.skills;
        this.qualifications = this.currentJobProfile.qualifications;
        this.certs = this.currentJobProfile.certifications;
        this.offers = this.currentJobProfile.offers;
        this.createdBy = this.currentJobProfile.createdBy;
        this.contractDurationInMonths = this.currentJobProfile.contractDurationInMonths
    }
    setStep(val: number): void {
        this.jobStep = val;
    }
}
