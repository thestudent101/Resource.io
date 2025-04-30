import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserType } from '../../user-profile-models';
import { WizardService } from '../../wizard.service';

@Component({
  selector: 'register-step',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    @Input() userType!: UserType;
    @Input() heading!: string;
    email!: FormControl;
    cellnumber!: FormControl;
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
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.cellnumber = new FormControl('', [Validators.required]); //, Validators.cellnumber]);//charles to change here
        this.password   = new FormControl('', [Validators.required]);
        this.repeatPassword = new FormControl('', [Validators.required]);
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    register() {
        if (this.email.value == ""){
            this.errorMessage = "Email address is required"
            return;
        }
        this.emailAddressOnBlur();
        if (this.email.invalid ) {
            this.errorMessage = "Email address is invalid";
            return;
        }
        if (this.cellnumber.value == ""){
            this.errorMessage = "Cellphone number is required"
            return;
        }
        if (this.cellnumber.invalid){
            this.errorMessage = "Cellphone number is invalid"
            return;
        }
        if (this.password.value.length < 8 || this.repeatPassword.value.length < 8){
            this.errorMessage = "Your password must be at least 8 characters long"
            return;
        }
        if (this.password.invalid || this.repeatPassword.invalid) {
            this.errorMessage = "Your password requires at least 1 capital letter, 1 small letter, 1 number and 1 special character"
            return;
        }
        if (this.password.value !== this.repeatPassword.value) {
            this.errorMessage = "Your passwords need to match"
            return;
        }
        this.loading = true;
        
        this.wizardService.createUserProfile(this.emailAddress, this.cellnumber.value, this.password.value, this.userType);
    }

    emailAddressOnBlur(){
        this.email.setValue(this.email.value.toLowerCase());
        this.email.updateValueAndValidity();
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

    get emailAddress(): string {
        return this.email.value.toLowerCase();
    }

    get cellNumber(): string {
        return this.cellnumber.value;
    }

    toggleVisibility(){        
        this.newPasswordType = (this.newPasswordType === "password") ? "text" : "password";
        this.confirmPasswordType = (this.confirmPasswordType === "password") ? "text" : "password";
    }

    get newPasswordVisible(): boolean{
        return this.newPasswordType === "text";
    }

}
