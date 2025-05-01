import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordWizardComponent } from './forgot-password-wizard/forgot-password-wizard.component';
import { LoginWizardComponent } from './login-wizard/login-wizard.component';
import { RegisterClientWizardComponent } from './register-client-wizard/register-client-wizard.component';
import { RegisterConsultantWizardComponent } from './register-consultant-wizard/register-consultant-wizard.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginWizardComponent },
  { path: 'register/client', component: RegisterClientWizardComponent },
  { path: 'register/consultant', component: RegisterConsultantWizardComponent },
  { path: 'forgot-password', component: ForgotPasswordWizardComponent },
  { path: 'callback', component: AuthCallbackComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingWizardRoutingModule { }
