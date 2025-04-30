import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientInvoicingComponent } from './client-invoicing/client-invoicing.component';
import { ClientProfileService } from '../client-profile/client-profile.service';


const routes: Routes = [{ path:'', component: ClientInvoicingComponent },
{ path: 'invoicing', component: ClientProfileService }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicingRoutingModule { }
