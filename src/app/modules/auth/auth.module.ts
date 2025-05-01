import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

@NgModule({
  declarations: [
    AuthComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompleteProfileComponent,
    AuthCallbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    CustomMaterialModule
  ]
})
export class AuthModule { }
