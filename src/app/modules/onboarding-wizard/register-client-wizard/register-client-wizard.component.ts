import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../wizard.service';
import { ClientRegisterStep } from '../user-profile-models';

@Component({
  selector: 'app-register-client-wizard',
  templateUrl: './register-client-wizard.component.html',
  styleUrls: ['./register-client-wizard.component.css']
})
export class RegisterClientWizardComponent implements OnInit, OnDestroy {

    private registerClientSubscription!: Subscription;
    private step!: ClientRegisterStep;
  
    constructor(private wizardService: WizardService) {}
  
    ngOnInit(): void {
        this.registerClientSubscription = this.wizardService.registerClientEvent$.subscribe((event) => this.eventHandler(event));
        this.step = this.wizardService.getClientStep();
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

    get isClientProfileStep(): boolean {
        return this.step === 'client_profile';
    }

    get isCompanyProfileStep(): boolean {
        return this.step === 'company_profile';
    }

    get isInviteUsersStep(): boolean {
        return this.step === 'invite_users';
    }

    get isAcceptPermissionsStep(): boolean {
        return this.step === 'accept_permissions';
    }

    eventHandler(step: ClientRegisterStep){
        this.step = step;
        if (this.step === 'cognito_profile'){
            this.wizardService.register();
        }
        if (this.step === 'verify_email_complete'){
            this.wizardService.manualLogin();
        }
    }
}
