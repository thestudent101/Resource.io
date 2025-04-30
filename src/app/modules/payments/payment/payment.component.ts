import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';

import { PayWizardService } from '../pay-wizard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ready!: boolean;
  paymentResult!: string;
  success!: boolean;
  error!: boolean;
  payResClass!: string;

  constructor( private payWizardService: PayWizardService, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.payWizardService.setStep("payment");
    this.ready = false;
    this.error = false;
    console.log("PaymentComponent.ngOnInit()",this.payWizardService);

    //get the payment result
    if (this.payWizardService.getCheckoutId()) {
      this.payWizardService.getPaymentResult(this.payWizardService.getCheckoutId(), this.payWizardService.getCompanyId()).subscribe(response => {
        console.log("Payment Result HTTP response",response);
        
        if (response.paymentUpdated){
          if (response.peachResponse && response.peachResponse.result && response.peachResponse.result.description){
            this.paymentResult = response.peachResponse.result.description;
          } else {
            this.paymentResult = "Payment History updated accordingly";
          }

          if (response.peachResponse && response.peachResponse.id && response.peachResponse.registrationId){ // check with peach payment what consists of a success
            this.success = true;
            this.payResClass = "payment-success";
  
            //this.payWizardService.setRegToken(response.peachResponse.registrationId); // do we even need to store that?
          } else {
            this.success = false;
            this.payResClass = "payment-failure";
          }
          
        } else {
          this.success = false;
          this.payResClass = "payment-failure";
          this.paymentResult = JSON.stringify(response);
          if (response.peachResponse && response.peachResponse.result && response.peachResponse.result.description) {
            this.paymentResult = response.peachResponse.result.description + "... An error occured while updating the payment history. Please contact the system administrator.";
          }
        }
        
        this.ready = true;
      }, error => {
        console.log("HTTP GET Error",error);
        this.paymentResult = "An unexpected error occured. Please contact your system administrator. Error details: " + JSON.stringify(error);
        this.ready = true;
      });
    } else {
      this.ready = true;
      this.error = true;
      this.paymentResult = "The checkout ID is not set, the transaction details cannot be retrieved.";
    }

  }

  back(): void {
    this.payWizardService.viewSubscription();
  }

  /*refund(): void {
    alert("Let us try a refund! - this is needed for back office purposes...");
    if (this.payWizardService.getCheckoutId && this.payWizardService.getRegToken && this.payWizardService.paymentId && this.success){
      alert("Attempting a Refund Transaction of R100! Payment ID: " + this.payWizardService.paymentId);
      this.payWizardService.getRefund(this.payWizardService.paymentId).subscribe(response => {
        console.log("Refund HTTP response",response);
        if (response.result && response.result.description){
          console.log(response.result.description);
          alert("Refund: " + response.result.description);
        }
      }, error => {
        console.log("Refund HTTP error",error);
      });
    } else {
      alert("No Refund permitted!");
    }
  }

  recurringPayment(): void {
    alert("Let us try a recurring payment! - this is needed for back office purposes...");
    if (this.payWizardService.getRegToken() && this.success){
      alert("Attempting to Pay again R100! Registration Token: " + this.payWizardService.getRegToken());
      this.payWizardService.processRecurringPayment(this.payWizardService.getRegToken()).subscribe(response => {
        console.log("Recurring Payment HTTP response",response);
        if (response.result && response.result.description){
          console.log(response.result.description);
          alert("Recurring Payment: " + response.result.description);
        }
      }, error => {
        console.log("Recurring Payment HTTP error",error);
      });
    } else {
      alert("No Recurring Payment permitted!");
    }
  }*/

}