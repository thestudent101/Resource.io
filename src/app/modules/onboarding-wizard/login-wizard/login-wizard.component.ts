import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoginStep, UserType } from '../user-profile-models';
import { WizardService } from '../wizard.service';

@Component({
  selector: 'app-login-wizard',
  templateUrl: './login-wizard.component.html',
  styleUrls: ['./login-wizard.component.css']
})
export class LoginWizardComponent implements OnInit, OnDestroy {

    private loginSubscription!: Subscription;
    private step!: LoginStep;
  
    constructor(private wizardService: WizardService, private router: Router) {}
  
    ngOnInit(): void {
        this.wizardService.reset();
        this.loginSubscription = this.wizardService.loginEvent$.subscribe((event) => this.eventHandler(event));
        this.step = this.wizardService.getLoginStep();
    }

    ngOnDestroy(): void {
        if (this.loginSubscription) this.loginSubscription.unsubscribe();
    }

    get isLoginStep(): boolean {
        return this.step === 'login';
    }

    get isVerifyEmailStep(): boolean {
        return this.step === 'verify_email';
    }

    get isConfirmTypeStep(): boolean {
        return false
    }

    get isAcceptPermissionsStep(): boolean {
        return this.step === 'accept_permissions';
    }

    eventHandler(step: LoginStep){
        this.step = step;
        if (this.step === 'verify_email_complete'){
            this.wizardService.manualLogin();
        }
        if (this.step === 'load_user_details'){
            this.wizardService.getUserProfile()
        }
        if (this.step === 'client_incomplete'){
            this.wizardService.setClientStep('client_profile');
            this.router.navigateByUrl('/auth/register/client')
        }
        if (this.step === 'contractor_incomplete'){
            this.wizardService.setContractorStep('contractor_profile');
            this.router.navigateByUrl('/auth/register/consultant')
        }
    }
}
