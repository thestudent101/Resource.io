import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { SubscribeComponent } from './subscribe/subscribe.component';


const routes: Routes = [
  { path: '', component: SubscribeComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'payment', component: PaymentComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
