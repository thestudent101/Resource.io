/*import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
*/





import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentComponent } from './payment/payment.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_URL_PROVIDER } from 'src/app/app.provider';
import { AppAuthHttpInterceptor } from 'src/app/app-auth-http.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { ConfirmSubscriptionDialogComponent } from './dialogs/confirm-subscription-dialog/confirm-subscription-dialog.component';
import { ConfirmCancelDialogComponent } from './dialogs/confirm-cancel-dialog/confirm-cancel-dialog.component';




@NgModule({
    /** 
     * All component declerations will be automatically added here if you 
     * type ng g c modules/client-profile/COMPONENTNAME
     * **/
    declarations: [
      PaymentComponent,
      CheckoutComponent,
      SubscribeComponent,
      ConfirmSubscriptionDialogComponent,
      ConfirmCancelDialogComponent
    ],
    imports: [
        /** You need to import any dependancies here as well, if they are needed by any components or services**/
        HttpClientModule,
        SharedModule,
        HttpClientModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormsModule,
       
        /** CommonModule must always be imported in any child module **/
        CommonModule,
        PaymentsRoutingModule,
        CustomMaterialModule
    ],
    // entryComponents: [
    //   ConfirmSubscriptionDialogComponent,
    //   ConfirmCancelDialogComponent
    // ],
    exports: [
        /** CommonModule must always be exported in any child module that may be imported into another module **/
        CommonModule,
    ],
    providers: [
        BASE_URL_PROVIDER,
        { provide: HTTP_INTERCEPTORS, useClass: AppAuthHttpInterceptor, multi: true },
    ]
})
export class PaymentsModule { }

