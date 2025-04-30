import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './auth.guard';
import { FeeStructureComponent } from './fee-structure/fee-structure.component';
import { HelpComponent } from './help-support/help/help.component';
import { ContractorsComponent } from './home/contractors/contractors.component';
import { NextStepsComponent } from './home/next-steps/next-steps.component';
// import {ConsultantsearchComponent} from '.home/ConsultantsearchComponent'
import { NotificationsComponent } from './home/notifications/notifications.component';
import { SignContractorTermsComponent } from './home/sign-contractor-terms/sign-contractor-terms.component';
import { ViewCandidateComponent } from './home/view-candidate/view-candidate.component';
import { JobProfileComponent } from './job-profile/job-profile.component';
import { JobDetailsComponent } from './modules/dashboard/job-details/job-details.component';
import { TermsComponent } from './terms/terms.component';
import { AvailableContractorsComponent } from './home/contractors/available-contractors/available-contractors.component';
import { JobProfilesRootComponent } from './home/job-profiles/job-profiles-root/job-profiles-root.component'
import { JobProfilesViewComponent } from './home/job-profiles/job-profiles-view/job-profiles-view.component';
import { JobProfilesAddComponent } from './home/job-profiles/job-profiles-add/job-profiles-add.component';
import { JobProfilesMatchComponent } from './home/job-profiles/job-profiles-match/job-profiles-match.component';
import { ContractorJobProfilesViewComponent } from './home/job-profiles/contractor-job-profiles-view/contractor-job-profiles-view.component';
import { ContractorProfileRoutingModule } from './modules/contractor-profile/contractor-profile-routing.module';
import { ContractorDashboardComponent } from './modules/contractor-profile/contractor-dashboard/contractor-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: 'landing', component: LandingComponent},
  { path: 'auth', loadChildren: () => import('./modules/onboarding-wizard/onboarding-wizard.module').then(m => m.OnboardingWizardModule)},    
  { path: 'main/dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'main', component: MainComponent, canActivateChild: [AuthGuard],
      children: [
          { path: '', redirectTo:'dashboardclient', pathMatch:'full'},
          { path: 'dashboardclient', loadChildren: () => import('./modules/dashboardclient/dashbordclient.module').then(m => m.DashbordclientModule)},
          { path: 'contractor-dashboard', component: ContractorDashboardComponent },
          { path: 'help', component: HelpComponent},
          { path: 'terms-and-conditions', component: TermsComponent},
          { path: 'candidate', component: ViewCandidateComponent},
          { path: 'fees', component: FeeStructureComponent},
          { path: 'contractors', component: ContractorsComponent, 
              children: [
                  { path: '', redirectTo:'available-contractors', pathMatch:'full' },
                  { path: 'available-contractors', component: AvailableContractorsComponent }
              ]},
          /** Import the ClientProfileModule on the path /main/client-profile/ **/
          { path: 'client-profile', loadChildren: () => import('./modules/client-profile/client-profile.module').then(m => m.ClientProfileModule)},
          { path: 'contractors', loadChildren: () => import('./modules/contractors/contractors.module').then(m => m.ContractorsModule)},
          
        //   { path: 'consultantsearch', loadChildren: () => import('./modules/dashboard/consultantsearch').then(m => m.)},
          { path: 'invoicing', loadChildren: () => import('./modules/invoicing/invoicing.module').then(m => m.InvoicingModule)},
          { path: 'payments', loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)},
          { path: 'references', loadChildren: () => import('./modules/references/references.module').then(m => m.ReferencesModule)},
          { path: 'timesheets', loadChildren: () => import('./modules/timesheets/timesheets.module').then(m => m.TimesheetsModule)},
          { path: 'user-profile', loadChildren: () => import('./modules/contractor-profile/contractor-profile.module').then(m => m.ContractorProfileModule)},
          { path: 'notifications', component: NotificationsComponent },
          { 
            path: 'job-profiles', component: JobProfilesRootComponent,
            children: [
                { path: '', redirectTo:'view-job-profiles', pathMatch:'full' },
                { path: 'view-job-profiles', component: JobProfilesViewComponent },
                { path: 'add-job-profile', component: JobProfilesAddComponent },
                { path: 'match-job-profile', component: JobProfilesMatchComponent },
                { path: 'sign-contractor-terms', component: SignContractorTermsComponent },
                { path: 'next-steps', component: NextStepsComponent },
                { path: 'job-details', component: JobDetailsComponent},
                { path: 'contractor-job-profiles', component: ContractorJobProfilesViewComponent },
                { path: '**', redirectTo:'/view-job-profiles', pathMatch:'full' }
            ]},
          { path: '**', redirectTo: '/dashboardclient', pathMatch: 'full' }
      ]
  },
  { path: 'job-profile', component: JobProfileComponent },
  { path: '**', redirectTo: '/landing', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
