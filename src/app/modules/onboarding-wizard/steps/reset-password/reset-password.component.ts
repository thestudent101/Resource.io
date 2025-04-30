import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'reset-password-step',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    code!: FormControl;
    password!: FormControl;
    repeatPassword!: FormControl;
    errorMessage!: string;
    loading!: boolean;
    newPasswordType = "password";
    confirmPasswordType = "password";

    constructor(private wizardService: WizardService) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.code = new FormControl('', [Validators.required]);
        this.password = new FormControl('', [Validators.required]);
        this.repeatPassword = new FormControl('', [Validators.required]);
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    reset() {
        if (this.code.invalid ) {
            this.errorMessage = "Code is required";
            return;
        }
        if (this.password.invalid || this.repeatPassword.invalid) {
            this.errorMessage = "You need to enter your new password twice"
            return;
        }
        if (this.password.value !== this.repeatPassword.value) {
            this.errorMessage = "Your passwords need to match"
            return;
        }
        this.loading = true;
        this.wizardService.resetPassword(this.code.value, this.password.value);
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

    toggleVisibility(){        
        this.newPasswordType = (this.newPasswordType === "password") ? "text" : "password";
        this.confirmPasswordType = (this.confirmPasswordType === "password") ? "text" : "password";
    }

    get newPasswordVisible(): boolean{
        return this.newPasswordType === "text";
    }

}