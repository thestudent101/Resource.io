import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeactivateProfileComponent } from './deactivate-profile/deactivate-profile.component';
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileviewComponent } from './profileview/profileview.component';
import { JobsViewContractorComponent } from './jobs-view-contractor/jobs-view-contractor.component';
import { JobSpecComponent } from './job-spec/job-spec.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';


const routes: Routes = [    
    { path: '', component: ContractorDashboardComponent },
    { path: 'Jobs-view', component: JobsViewContractorComponent },
    { path: 'edit', component: ProfileEditComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'deactivate-account', component: DeactivateProfileComponent },
    { path: 'job-spec/:id', component: JobSpecComponent }, // Add the route for JobSpecComponent with a parameter
    { path: 'view-jobs', component: ViewJobsComponent },
    { path: 'profileview', component:ProfileviewComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorProfileRoutingModule { }
