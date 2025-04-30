import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { PayWizardService } from '../../pay-wizard.service';

@Component({
  selector: 'app-confirm-subscription-dialog',
  templateUrl: './confirm-subscription-dialog.component.html',
  styleUrls: ['./confirm-subscription-dialog.component.css']
})
export class ConfirmSubscriptionDialogComponent implements OnInit {

  paymentTypeForm!: FormGroup;
  savedCC!: boolean;

  constructor(public dialogRef: MatDialogRef<ConfirmSubscriptionDialogComponent>, private payWizardService: PayWizardService) {}

  ngOnInit(): void {
    this.paymentTypeForm = new FormGroup({
      paymentTypeRadio: new FormControl("CREDIT_CARD") // default payment Method
    });
    this.savedCC = this.payWizardService.getExistingCCToken();
  }

  onNoClick(): void {
    var request = {"subscribe": "N"};
      this.dialogRef.close(request);
  }

  onOkClick(): void {

    console.log("pick radio button",this.paymentTypeForm.value);

    if (this.paymentTypeForm.value && this.paymentTypeRadio.value){
      var request = {"subscribe": "Y", "paymentType": this.paymentTypeRadio.value};
      this.dialogRef.close(request);
    } else {
      alert("Please pick a payment option.");
    }

  }

  onOKUpdClick(): void {

    console.log("pick radio button",this.paymentTypeForm.value);

    if (this.paymentTypeForm.value && this.paymentTypeRadio.value){
      var request = {"subscribe": "Y", "paymentType": this.paymentTypeRadio.value, "updateCreditCard": true};
      this.dialogRef.close(request);
    } else {
      alert("Please pick a payment option to update.");
    }

  }

  get termsUrl(): string {
    return environment.termsUrl;
  }

  get paymentTypeRadio(): FormControl{
    return this.paymentTypeForm.get("paymentTypeRadio") as FormControl;
  }

}
