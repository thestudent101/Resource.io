import { Component, OnInit, OnDestroy } from '@angular/core';
import { WizardService } from '../wizard.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ForgotPasswordStep } from '../user-profile-models';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-wizard.component.html',
  styleUrls: ['./forgot-password-wizard.component.css']
})
export class ForgotPasswordWizardComponent implements OnInit, OnDestroy {

    private forgotPasswordSubscription: Subscription = new Subscription;
    private step: ForgotPasswordStep = "forgot_password";
  
    constructor(private wizardService: WizardService, private router: Router) {}
  
    ngOnInit(): void {
        this.forgotPasswordSubscription = this.wizardService.forgotPasswordEvent$.subscribe((event) => this.eventHandler(event));
    }

    ngOnDestroy(): void {
        if (this.forgotPasswordSubscription) this.forgotPasswordSubscription.unsubscribe();
    }

    get isForgotPasswordStep(): boolean {
        return this.step === 'forgot_password';
    }

    get isCreatePasswordStep(): boolean {
        return this.step === 'create_password';
    }

    eventHandler(step: ForgotPasswordStep){
        this.step = step;
        if (this.step === 'login') {
            this.router.navigateByUrl('/auth/login');
        }
    }
}

