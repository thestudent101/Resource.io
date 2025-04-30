import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'forgot-password-step',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

    private errorSubscription: Subscription = new Subscription;
    email!: FormControl;
    errorMessage!: string;
    loading: boolean = false;

    constructor(private wizardService: WizardService) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    recover() {
        if (this.email.invalid ) {
            this.errorMessage = "Your email address is required";
            return;
        }
        this.loading = true;
        this.wizardService.requestPasswordReset(this.email.value);
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

}
