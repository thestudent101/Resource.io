import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { HelpComponent } from './help-support/help/help.component';
import { ContractorsComponent } from './home/contractors/contractors.component';
import { NextStepsComponent } from './home/next-steps/next-steps.component';
import { NotificationsComponent } from './home/notifications/notifications.component';
import { PaymentsComponent } from './home/payments/payments.component';
import { SignContractorTermsComponent } from './home/sign-contractor-terms/sign-contractor-terms.component';
import { ViewCandidateComponent } from './home/view-candidate/view-candidate.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { TermsComponent } from './terms/terms.component';
import { CustomMaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppAuthHttpInterceptor } from './app-auth-http.interceptor';
import { BASE_URL_PROVIDER } from './app.provider';
import { AuthGuardService } from './auth.guard';
import { AvailableContractorsComponent } from './home/contractors/available-contractors/available-contractors.component';
import { ViewContractorDetailsComponent } from './home/contractors/view-contractor-details/view-contractor-details.component';
import { ContractorJobProfilesViewComponent } from './home/job-profiles/contractor-job-profiles-view/contractor-job-profiles-view.component';
import { JobProfilesAddComponent } from './home/job-profiles/job-profiles-add/job-profiles-add.component';
import { JobProfilesMatchComponent } from './home/job-profiles/job-profiles-match/job-profiles-match.component';
import { JobProfilesRootComponent } from './home/job-profiles/job-profiles-root/job-profiles-root.component';
import { JobProfilesViewComponent } from './home/job-profiles/job-profiles-view/job-profiles-view.component';
import { ContractorCardComponent } from './home/job-profiles/contractor-card/contractor-card.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { LogoutDialogComponent } from './home/dialogs/logout-dialog/logout-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobprofileviewComponent } from './home/BlueDesk/jobprofileview/jobprofileview.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JobDetailsComponent } from './home/job-profiles/job-details/job-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConsultantsearchComponent } from './modules/dashboard/consultantsearch/consultantsearch.component';
import { HelpSupportModule } from './help-support/help-support.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TermsModule } from './terms/terms.module';
import { CommonModule } from '@angular/common';
import { MainModule } from './main/main.module';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [AppComponent, LandingComponent, MainComponent, JobProfileComponent, HelpComponent, DashboardComponent, ContractorsComponent, PaymentsComponent, NotificationsComponent, AvailableContractorsComponent, JobProfilesAddComponent, JobProfilesRootComponent, JobProfilesViewComponent, JobDetailsComponent, LogoutDialogComponent, ViewContractorDetailsComponent, JobProfilesMatchComponent, ViewCandidateComponent, TermsComponent, ContractorJobProfilesViewComponent, FeeStructureComponent, NextStepsComponent, SignContractorTermsComponent, ContractorCardComponent, JobprofileviewComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    SharedModule,
    HttpClientModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatIconModule,
    HelpSupportModule,
    TermsModule,
    CommonModule,
    MainModule,
    RouterModule,
    // Import new modules
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [BASE_URL_PROVIDER, {
    provide: HTTP_INTERCEPTORS,
    useClass: AppAuthHttpInterceptor,
    multi: true
  }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}