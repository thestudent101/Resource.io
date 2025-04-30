import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppAuthHttpInterceptor } from 'src/app/app-auth-http.interceptor';
import { BASE_URL_PROVIDER } from 'src/app/app.provider';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContractorProfileRoutingModule } from './contractor-profile-routing.module';
import { DeactivateProfileComponent } from './deactivate-profile/deactivate-profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileviewComponent } from './profileview/profileview.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HighlightnullPipe } from './pipes/highlightnull.pipe';
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { JobSpecComponent } from './job-spec/job-spec.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { JobsViewContractorComponent } from './jobs-view-contractor/jobs-view-contractor.component';




@NgModule({
  declarations: [
      ChangePasswordComponent,
      DeactivateProfileComponent,
      ProfileEditComponent,
      ProfileviewComponent,
      HighlightnullPipe,
      ContractorDashboardComponent,
      JobSpecComponent,
      ViewJobsComponent,
      JobsViewContractorComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    FormsModule,
    SharedModule,
    CommonModule,
    ContractorProfileRoutingModule,
    NgxIntlTelInputModule
  ],
  providers: [
      BASE_URL_PROVIDER,
      { provide: HTTP_INTERCEPTORS, useClass: AppAuthHttpInterceptor, multi: true },
  ]
})
export class ContractorProfileModule { }
