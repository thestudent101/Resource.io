import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WizardService } from '../../wizard.service';
import { Titles } from 'src/app/modules/contractor-profile/user-profile-models';

@Component({
  selector: 'contractor-profile-step',
  templateUrl: './contractor-profile.component.html',
  styleUrls: ['./contractor-profile.component.css']
})
export class ContractorProfileComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    private profileForm!: FormGroup;
    errorMessage!: string;
    loading!: boolean;
    titles!: Titles[];

    constructor(private wizardService: WizardService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.wizardService.loadSkills();
        this.titles = this.wizardService.getTitles();
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.profileForm = this.formBuilder.group({
            title: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            surname: new FormControl('', [Validators.required]),
            idNumber: new FormControl('', [Validators.required]),
            // Get the cell number from registration step
            contactNumber: new FormControl(this.wizardService.getCellNumber(), [Validators.required]) 
        });
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    get title(): FormControl {
        return this.profileForm.get('title') as FormControl;
    }    
    get name(): FormControl {
        return this.profileForm.get('name') as FormControl;
    }
    get surname(): FormControl {
        return this.profileForm.get('surname') as FormControl;
    }
    get idNumber(): FormControl {
        return this.profileForm.get('idNumber') as FormControl;
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
        this.wizardService.clearContractorProfile();
        this.wizardService.setContractorProfile(this.profileForm.value);
        this.wizardService.triggerContractorEvent('contractor_details');
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}
