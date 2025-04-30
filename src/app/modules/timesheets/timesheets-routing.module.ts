import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetsComponent } from './timesheets/timesheets.component';


const routes: Routes = [
  { path:'', component: TimesheetsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetsRoutingModule { }
