import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { authGuard } from 'src/app/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ClientLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ClientDashboardComponent },
      { path: 'jobs', component: JobPostingComponent },
      { path: 'candidates', component: CandidatesComponent }
    ]
  },
  { path: 'onboarding', component: ClientOnboardingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
