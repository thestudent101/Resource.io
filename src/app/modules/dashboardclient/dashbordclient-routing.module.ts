import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardclientComponent } from './dashboardclient.component';

const routes: Routes = [
  {path: '', component: DashboardclientComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordclientRoutingModule { }
