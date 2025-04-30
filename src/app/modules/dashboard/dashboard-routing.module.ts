import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContractorViewComponent } from './contractor-view/contractor-view.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ContractorDetailComponent } from './contractor-detail/contractor-detail.component';
import { SecureContractorDetailComponent } from './secure-contractor-detail/secure-contractor-detail.component';
import { SecureJobDetailsComponent } from './secure-job-details/secure-job-details.component';
import { FilteredContractorViewComponent } from './filtered-contractor-view/filtered-contractor-view.component';
import { OverviewComponent } from './overview/overview.component';
import { ConsultantsearchComponent } from './consultantsearch/consultantsearch.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, 
        children: [
            { path: '', component:ConsultantsearchComponent },
            { path: 'client-view', component: ClientViewComponent },
            // {path:'search-consultant',component:ConsultantsearchComponent},
            { path: 'client-view/:client/jobs', component: ClientDetailsComponent },
            { path: 'client-view/:client/jobs/:job', component: JobDetailsComponent },
            { path: 'client-view/:client/jobs/:job/private', component: SecureJobDetailsComponent },
            { path: 'contractor-view', component: ContractorViewComponent },
            { path: ':level/contractor-view', component: FilteredContractorViewComponent },
            { path: 'contractor-view/:contractor', component: ContractorDetailComponent },
            { path: 'contractor-view/:contractor/private', component: SecureContractorDetailComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
