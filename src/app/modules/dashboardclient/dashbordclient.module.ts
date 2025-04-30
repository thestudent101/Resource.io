import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordclientRoutingModule } from './dashbordclient-routing.module';
import { DashboardclientComponent } from './dashboardclient.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { PiechartComponent } from './piechart/piechart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RecentJobsViewComponent } from './recent-jobs-view/recent-jobs-view.component';


@NgModule({
  declarations: [
    DashboardclientComponent,
    PiechartComponent,
    RecentJobsViewComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    DashbordclientRoutingModule,
    CustomMaterialModule
  ]
})
export class DashbordclientModule { }
