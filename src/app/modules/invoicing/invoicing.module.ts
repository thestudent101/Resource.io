import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicingRoutingModule } from './invoicing-routing.module';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { ClientInvoicingComponent } from './client-invoicing/client-invoicing.component';


@NgModule({
  declarations: [ClientInvoicingComponent],
  imports: [
    CommonModule,
    InvoicingRoutingModule,
    CustomMaterialModule,
    FormsModule
  ]
})
export class InvoicingModule { }
