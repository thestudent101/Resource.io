import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'client-profile-step',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    private profileForm!: FormGroup;
    errorMessage!: string;
    loading!: boolean;

    constructor(private wizardService: WizardService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.profileForm = this.formBuilder.group({
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            // Get the cell number from registration step
            contactNumber: new FormControl(this.wizardService.getCellNumber(), [Validators.required])
        });
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    get name(): FormControl {
        return this.profileForm.get('name') as FormControl;
    }
    get surname(): FormControl {
        return this.profileForm.get('surname') as FormControl;
    }
    get contactNumber(): FormControl {
        return this.profileForm.get('contactNumber') as FormControl;
    }

    skip() {
        this.wizardService.skip();
    }

    next() {
        if (this.profileForm.invalid){
            this.errorMessage = "Please complete the required details or press skip"
            return;
        }
        this.loading = true;
        this.wizardService.clearClientProfile();
        this.wizardService.setClientProfile(this.profileForm.value);
        this.wizardService.triggerClientEvent('company_profile');
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}