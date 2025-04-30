import { Component, OnInit, OnDestroy } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'login-step',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    email!: FormControl;
    password!: FormControl;
    errorMessage!: string;
    loading!: boolean;
    passwordType = "password"
    checkboxValue: boolean = false;
    buttonDisabled: boolean = true;

    isOverlayVisible = false;

    checkbox = new FormControl();

    constructor(private wizardService: WizardService,private router: Router) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.password = new FormControl('', [Validators.required]);
        this.errorMessage = "";

        this.checkbox.valueChanges.subscribe((value) => {
            // Disable the button if the checkbox is not checked.
            this.buttonDisabled = !value;
          });
    }

    ngOnDestroy() {
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    navigateToTermsAndConditions() {
        // Navigate to the "Terms and Conditions" route
        this.router.navigateByUrl('main/sign-contractor-terms');
    }



    login() {
        this.emailAddressOnBlur();
        if (this.email.invalid || this.password.invalid) {
            this.errorMessage = "Your username or password is invalid";
            return;
        }
        this.loading = true;
        this.wizardService.login(this.email.value.toLowerCase() , this.password.value);
    }

    emailAddressOnBlur(){
        this.email.setValue(this.email.value.toLowerCase());
        this.email.updateValueAndValidity();
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

    toggleVisibility(){
        this.passwordType = (this.passwordType === "password") ? "text" : "password";
    }

    onToggleSignupOverlay() {
        this.isOverlayVisible = !this.isOverlayVisible;
    }

    closeSignupOverlay(){
        this.isOverlayVisible = false;
    }

    get passwordVisible(): boolean{
        return this.passwordType === "text";
    }
}
