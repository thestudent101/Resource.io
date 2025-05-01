import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { ContractorLayoutComponent } from './contractor-layout/contractor-layout.component';
import { ContractorOnboardingComponent } from './contractor-onboarding/contractor-onboarding.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ContractorLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ContractorDashboardComponent },
      { path: 'jobs', component: JobSearchComponent },
      { path: 'resume', component: ResumeBuilderComponent }
    ]
  },
  { path: 'onboarding', component: ContractorOnboardingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorRoutingModule { }
