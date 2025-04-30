import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimesheetsRoutingModule } from './timesheets-routing.module';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { TimesheetsSummaryComponent } from './timesheets-summary/timesheets-summary.component';
import { TimesheetEditorComponent } from './timesheet-editor/timesheet-editor.component';
import { AdministerTimesheetsComponent } from './administer-timesheets/administer-timesheets.component';
import { DayViewComponent } from './day-view/day-view.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminRejectionComponent } from './admin-rejection/admin-rejection.component';
import { AdminSummaryComponent } from './admin-summary/admin-summary.component';
import { AdminWeekViewComponent } from './admin-week-view/admin-week-view.component';


@NgModule({
    declarations: [
        TimesheetsComponent,
        TimesheetsSummaryComponent,
        TimesheetEditorComponent,
        AdministerTimesheetsComponent,
        DayViewComponent,
        WeekViewComponent,
        AdminApprovalComponent,
        AdminRejectionComponent,
        AdminSummaryComponent,
        AdminWeekViewComponent
    ],
    imports: [
        CommonModule,
        TimesheetsRoutingModule,
        CustomMaterialModule,
        SharedModule,
       
        FormsModule,
    ],
    providers:[
        DatePipe
    ]
    // entryComponents: [
    //     AdminApprovalComponent,
    //     AdminRejectionComponent
    // ]
})
export class TimesheetsModule { }
