import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'company-profile-step',
  templateUrl: './company-profile-step.component.html',
  styleUrls: ['./company-profile-step.component.css']
})
export class CompanyProfileStepComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    private profileForm!: FormGroup;
    errorMessage!: string;
    loading!: boolean;
    companyExists!: boolean;

    constructor(private wizardService: WizardService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.profileForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            registrationNumber: new FormControl('', [Validators.required]),
            tradingName: new FormControl(''),
            webDomainName: new FormControl('')
        });
        this.companyExists = false;
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    get name(): FormControl {
        return this.profileForm.get('name') as FormControl;
    }
    get registrationNumber(): FormControl {
        return this.profileForm.get('registrationNumber') as FormControl;
    }

    get tradingName(): FormControl {
        return this.profileForm.get('tradingName') as FormControl;
    }
    get webDomainName(): FormControl {
        return this.profileForm.get('webDomainName') as FormControl;
    }

    skip() {
        this.wizardService.skip();
    }

    onRegistrationNumberBlur(){
        this.wizardService.getCompanyDetails(this.registrationNumber.value)
            .then(company => {
                this.companyExists = true;
            })
            .catch(error => {
                this.companyExists = false;
            })
    }

    requestAccess(){
        let emailAddress = this.wizardService.getUserName();
        this.wizardService.requestToJoinCompany(emailAddress, this.name.value, this.registrationNumber.value)
        .then(() => {
            this.wizardService.triggerClientEvent('request_access_complete');
        })
        .catch(error => {
            console.log(error);
            this.wizardService.triggerClientEvent('request_access');
        })
    }

    next() {
        this.updateClientProfile();
    }

    private updateClientProfile(){
        if (this.profileForm.invalid){
            this.errorMessage = "Please complete the required details or press skip"
            return;
        }
        this.loading = true;
        let companyProfile = {
            company: this.profileForm.value
        }
        this.wizardService.setClientProfile(companyProfile);
        this.wizardService.createClientProfile();
    }
    

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}