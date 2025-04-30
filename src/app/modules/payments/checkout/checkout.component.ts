import { Component, OnInit, Inject, Renderer2, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/shared/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { PayWizardService } from '../pay-wizard.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private routeSubscription!: Subscription;
  private resourcePath: string = "";
    ready!: boolean;
    clientProfileForm!: FormGroup;
    checkoutid!: string;
    disabled = false;
    errorText = "";
    errorMessage!: string;

    constructor(public dialogRef: MatDialogRef<CheckoutComponent>, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document, private router: Router, private sessionClass: SessionService, private payWizardService: PayWizardService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

    ngOnInit() {
      this.payWizardService.setStep("checkout");
      console.log("checkout component payWizardService",this.payWizardService);
      this.ready = false;

      console.log("checkout component - this.payWizardService.checkoutId",this.payWizardService.getCheckoutId());
      if (this.payWizardService.getCheckoutId()) {
        this.stylePaymentForm();
        this.ready = true;
        
        this.loadPeach(this.payWizardService.getCheckoutId());
      }
      console.log("this",this.sessionClass);
  
      this.routeSubscription = this.activatedRoute.params.subscribe(params => {
        if (params['resourcePath']){
            /* use params.resourcePath here */
            this.resourcePath = params['resourcePath'];
        }
      });

    }

    ngOnDestroy(): void {
      if (this.routeSubscription) {
        this.routeSubscription.unsubscribe();
      }
    }
  
    stylePaymentForm(): void {
      let script = this._renderer2.createElement('script');
      script.type = 'application/javascript'; 
      script.text = 'var wpwlOptions = {style: "card", locale: "en"}';
      this._renderer2.appendChild(this._document.body, script);
    }
  
    loadPeach(entityID: string): void {
      let script = this._renderer2.createElement('script');
      console.log('script2',script);
      script.type = 'application/javascript';
      script.text = '';
      //script.src  = 'https://test.oppwa.com/v1/paymentWidgets.js?checkoutId='+entityID;
      script.src  = environment.peachUrl + entityID;
    
      this._renderer2.appendChild(this._document.body, script);
    }
    
    get hasErrors(): boolean {
        return this.errorText.length > 0;
    }

    get peachRedirectUrl(): string {
      console.log("window.location",window.location)
      return window.location.origin + "/main/payments/payment";
    }  
}
