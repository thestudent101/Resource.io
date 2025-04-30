import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../wizard.service';
import { ContractorRegisterStep } from '../user-profile-models';

@Component({
  selector: 'app-register-consultant-wizard',
  templateUrl: './register-consultant-wizard.component.html',
  styleUrls: ['./register-consultant-wizard.component.css']
})
export class RegisterConsultantWizardComponent implements OnInit , OnDestroy {

    private registerClientSubscription: Subscription = new Subscription;
    private step: ContractorRegisterStep = "register";
  
    constructor(private wizardService: WizardService) {}
  
    ngOnInit(): void {
        this.registerClientSubscription = this.wizardService.registerContractorEvent$.subscribe((event) => this.eventHandler(event));
        this.step = this.wizardService.getContractorStep();
    }

    ngOnDestroy(): void {
        if (this.registerClientSubscription) this.registerClientSubscription.unsubscribe();
    }

    get isRegisterStep(): boolean {
        return this.step === 'register';
    }

    get isVerifyEmailStep(): boolean {
        return this.step === 'verify_email';
    }

    get isContractorProfileStep(): boolean {
        return this.step === 'contractor_profile';
    }

    get isContractorDetailsStep(): boolean {
        return this.step === 'contractor_details';
    }

    get isAcceptPermissionsStep(): boolean {
        return this.step === 'accept_permissions';
    }

    eventHandler(step: ContractorRegisterStep){
        console.log(step);
        this.step = step;
        if (this.step === 'cognito_profile'){
            this.wizardService.register();
        }
        if (this.step === 'verify_email_complete'){
            this.wizardService.manualLogin();
        }
    }

}
