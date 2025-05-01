import { Component, OnInit } from '@angular/core';
import { AuthenticationManagementService, CognitoError } from 'src/app/authentication-management.service';
import { UserProfileService } from '../user-profile-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm: any;
    passwordError = "";
    disableButton = false;
    currentPasswordType = "password";
    newPasswordType = "password";
    confirmPasswordType = "password";

    constructor(private userProfileService: UserProfileService, private router: Router) {
        this.changePasswordForm =new FormGroup({})
    }

    ngOnInit() {
        this.changePasswordForm = this.userProfileService.getChangePasswordForm();
    }

    onChangePassword() {
        if (!this.passwordValid || this.changePasswordForm.get('currentPassword').value.length === 0) {
            this.passwordError = "You need to input your current password"
            return;
        }
        if (!this.newPasswordValid || this.changePasswordForm.get('newPassword').value.length === 0) {
            this.passwordError = "You need to input a valid new password and your passwords need to match"
            return;
        }
        if (!this.confirmPasswordValid || this.changePasswordForm.get('confirmPassword').value.length === 0) {
            this.passwordError = "Your new passwords need to match"
            return;
        }
        this.disableButton = true;
        let values = this.changePasswordForm.value;
        this.userProfileService.changePassword(values).subscribe({
            next: (success) => {
                this.disableButton = false;
                this.router.navigateByUrl('/main/user-profile');
            },
            error: (error: CognitoError) => {
                this.disableButton = false;
                this.passwordError = error.message;
            }
        });
    }

    toggleVisibility(name: string){
        switch (name.toLowerCase()){
            case "currentpassword":
                this.currentPasswordType = (this.currentPasswordType === "password") ? "text" : "password";
                break;
            case "newpassword":
                this.newPasswordType = (this.newPasswordType === "password") ? "text" : "password";
                this.confirmPasswordType = (this.confirmPasswordType === "password") ? "text" : "password";
                break;
        }
    }

    get currentPasswordVisible(): boolean{
        return this.currentPasswordType === "text";
    }

    get newPasswordVisible(): boolean{
        return this.newPasswordType === "text";
    }

    get confirmPasswordVisible(): boolean{
        return this.confirmPasswordType === "text";
    }

    get hasErrors():boolean {
        return this.passwordError.length > 0;
    }

    get passwordValid(): boolean {
        let element = this.changePasswordForm.get('currentPassword') as FormControl;
        return !(element.invalid && (element.dirty || element.touched));
    }

    get newPasswordValid(): boolean {
        let element = this.changePasswordForm.get('newPassword') as FormControl;
        let element2 = this.changePasswordForm.get('confirmPassword') as FormControl;
        return !(element.invalid && (element.dirty || element.touched)) && (element.value == element2.value);
    }

    get confirmPasswordValid(): boolean {
        let element = this.changePasswordForm.get('newPassword') as FormControl;
        let element2 = this.changePasswordForm.get('confirmPassword') as FormControl;
        return !(element.invalid && (element.dirty || element.touched)) && (element.value == element2.value);
    }
}
