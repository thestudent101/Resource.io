import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'verify-email-step',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    code!: FormControl;
    errorMessage!: string;
    loading!: boolean;

    constructor(private wizardService: WizardService) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.code = new FormControl('', [Validators.required]);
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    resend(){
        this.wizardService.resendVerificationCode();
    }
 
    verify() {
        if (this.code.invalid ) {
            this.errorMessage = "Your code is invalid";
            return;
        }
        this.loading = true;
        this.wizardService.verifyEmailAddress(this.code.value);
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

}
