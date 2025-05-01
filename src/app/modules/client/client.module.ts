import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientOnboardingComponent } from './client-onboarding/client-onboarding.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { CandidatesComponent } from './candidates/candidates.component';

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ClientLayoutComponent,
    ClientOnboardingComponent,
    JobPostingComponent,
    CandidatesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ClientRoutingModule,
    CustomMaterialModule
  ]
})
export class ClientModule { }
