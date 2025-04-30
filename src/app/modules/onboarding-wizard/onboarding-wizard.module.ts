import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingWizardRoutingModule } from './onboarding-wizard-routing.module';
import { RegisterClientWizardComponent } from './register-client-wizard/register-client-wizard.component';
import { LoginWizardComponent } from './login-wizard/login-wizard.component';
import { ForgotPasswordWizardComponent } from './forgot-password-wizard/forgot-password-wizard.component';
import { RegisterConsultantWizardComponent } from './register-consultant-wizard/register-consultant-wizard.component';
import { AcceptPermissionsStepComponent } from './steps/accept-permissions-step/accept-permissions-step.component';
import { ClientProfileComponent } from './steps/client-profile/client-profile.component';

import { ContractorProfileComponent } from './steps/contractor-profile/contractor-profile.component';
import { ForgotPasswordComponent } from './steps/forgot-password/forgot-password.component';
import { LoginComponent } from './steps/login/login.component';
import { RegisterComponent } from './steps/register/register.component';
import { ResetPasswordComponent } from './steps/reset-password/reset-password.component';
import { VerifyEmailComponent } from './steps/verify-email/verify-email.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_URL_PROVIDER } from 'src/app/app.provider';
import { AppAuthHttpInterceptor } from 'src/app/app-auth-http.interceptor';
import { CompanyProfileStepComponent } from './steps/company-profile-step/company-profile-step.component';
import { ConfirmUserTypeComponent } from './steps/confirm-user-type/confirm-user-type.component';
import { ContractorDetailsComponent } from './steps/contractor-details/contractor-details.component';
import { InviteUsersStepComponent } from './steps/invite-users-step/invite-users-step.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CompanyProfileStepComponent, 
    ContractorProfileComponent,
    ClientProfileComponent,
    InviteUsersStepComponent, 
    AcceptPermissionsStepComponent, 
    RegisterComponent, 
    ConfirmUserTypeComponent, 
    VerifyEmailComponent, 
    ForgotPasswordComponent, 
    ResetPasswordComponent, 
    LoginComponent,
    LoginWizardComponent, 
    ForgotPasswordWizardComponent,
    RegisterClientWizardComponent,
    RegisterConsultantWizardComponent,
    ContractorDetailsComponent,
  ],
  imports: [
    CommonModule,
    OnboardingWizardRoutingModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ], exports: [
    /** CommonModule must always be exported in any child module that may be imported into another module **/
    CommonModule,
],
providers: [
    BASE_URL_PROVIDER,
    { provide: HTTP_INTERCEPTORS, useClass: AppAuthHttpInterceptor, multi: true },
]
})
export class OnboardingWizardModule { }
