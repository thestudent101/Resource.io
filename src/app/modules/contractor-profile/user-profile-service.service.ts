import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BASE_URL } from 'src/app/app.provider';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { ChangePasswordRequest } from './user-profile-models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {

    constructor(private formBuilder: FormBuilder, private CustAuth: AuthenticationManagementService) { }

    getUserProfileForm(): FormGroup {
        return this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            idNumber: ['', Validators.required],
            contactNumber: ['', Validators.required],
            email: ['', Validators.required],
            nationality: [''],
            race: [''],
            title: [''],
            gender: [''],
            city: [''],
            province: [''],
            preferredJobLocation: [''],
            ratePerHour: [''],
            noticePeriod: [''],
            workHistory: this.formBuilder.array([]),
            references: this.formBuilder.array([]),
            skills: this.formBuilder.array([]),
            certifications: this.formBuilder.array([]),
            qualifications: this.formBuilder.array([]),
        })
    }

    getChangePasswordForm(): FormGroup {
        return this.formBuilder.group({
            currentPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        })
    }

    changePassword(request: ChangePasswordRequest): Observable<any> {
        return this.CustAuth.changePassword(request.currentPassword, request.newPassword);
    }
}
