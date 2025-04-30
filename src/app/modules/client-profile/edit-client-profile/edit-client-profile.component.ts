import { Component, OnInit, Inject } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientProfileService } from '../client-profile.service';
import { ClientProfile } from '../client-profile-models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-edit-client-profile',
    templateUrl: './edit-client-profile.component.html',
    styleUrls: ['./edit-client-profile.component.css']
})
export class EditClientProfileComponent implements OnInit {

    isLoading = true;;
    clientProfileForm: any;
    profile!: any;
    disabled = false;
    errorText = "";
    createProfile = true;

    // cognito and aws4 

    constructor(private clientProfileService: ClientProfileService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder, private sessionClass: SessionService) { 
        this.clientProfileForm = new FormGroup({})
    }

    ngOnInit() {
        this.buildForm();
        this.loadProfile();
    }

    get hasErrors(): boolean {
        return this.errorText.length > 0;
    }

    get companyForm(): FormGroup {
        return this.clientProfileForm.get('company') as FormGroup;
    }

    get profileFormInvalid(): boolean {
        return this.clientProfileForm.invalid;
    }

    onSaveButtonClick() {
        if (this.clientProfileForm.invalid) return;
        if (this.createProfile == true) {
            this.createClientProfile();
        } else {
            this.updateClientProfile();
        }
    }

    private loadProfile() {
        this.isLoading = true;
        this.clientProfileService.loadProfile().subscribe(response => {
            this.profile = response;
            if (this.profile == null) {
                this.createProfile = true;
            } else {
                this.updateForm();
                this.createProfile = false;
            }
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status == 404) {
                this.profile = null;
            } else {
                this.errorText = error.error.message
            }
        });
    }

    private buildForm(){
        this.clientProfileForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: [''],
            emailAddress: [this.sessionClass.getUsername(), Validators.required],
            contactNumber: [''],
            company: this.formBuilder.group({
                name: ['', Validators.required],
                registrationNumber: ['', Validators.required],
                tradingName: [''],
                webDomainName: [''],
                vatNumber:[''],
                physicalAddress:[''],
                postalAddress: [''],
            })
        })
    }

    private updateForm(){
        this.clientProfileForm.get('name').setValue(this.profile.name || '');
        this.clientProfileForm.get('name').updateValueAndValidity();
        this.clientProfileForm.get('surname').setValue(this.profile.surname || '');
        this.clientProfileForm.get('surname').updateValueAndValidity();
        this.clientProfileForm.get('emailAddress').setValue(this.sessionClass.getUsername());
        this.clientProfileForm.get('emailAddress').updateValueAndValidity();
        this.clientProfileForm.get('contactNumber').setValue(this.profile.contactNumber || '');
        this.clientProfileForm.get('contactNumber').updateValueAndValidity();
        this.clientProfileForm.get('company').get('name').setValue(this.profile.company.name || '');
        this.clientProfileForm.get('company').get('name').updateValueAndValidity();
        this.clientProfileForm.get('company').get('registrationNumber').setValue(this.profile.company.registrationNumber || '');
        this.clientProfileForm.get('company').get('registrationNumber').updateValueAndValidity();
        this.clientProfileForm.get('company').get('tradingName').setValue(this.profile.company.tradingName);
        this.clientProfileForm.get('company').get('tradingName').updateValueAndValidity();
        this.clientProfileForm.get('company').get('webDomainName').setValue(this.profile.company.webDomainName);
        this.clientProfileForm.get('company').get('webDomainName').updateValueAndValidity();
        this.clientProfileForm.get('company').get('vatNumber').setValue(this.profile.company.vatNumber);
        this.clientProfileForm.get('company').get('vatNumber').updateValueAndValidity();
        this.clientProfileForm.get('company').get('physicalAddress').setValue(this.profile.company.physicalAddress);
        this.clientProfileForm.get('company').get('physicalAddress').updateValueAndValidity();
        this.clientProfileForm.get('company').get('postalAddress').setValue(this.profile.company.postalAddress);
        this.clientProfileForm.get('company').get('postalAddress').updateValueAndValidity();
        this.clientProfileForm.updateValueAndValidity();
    }

    private createClientProfile(){
        this.clientProfileService.createClientProfile(this.clientProfileForm.value).subscribe(response => {
            this.router.navigateByUrl('/main/client-profile');
        }, error => {
            console.log(error)
            this.errorText = error.message;
        });
    }

    private updateClientProfile(){
        this.clientProfileService.updateClientProfile(this.clientProfileForm.value).subscribe(response => {
            this.router.navigateByUrl('/main/client-profile');
        }, error => {
            console.log(error)
            this.errorText = error.message;
        });
    }
}
