import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { PayWizardService } from '../../pay-wizard.service';

@Component({
  selector: 'app-confirm-cancel-dialog',
  templateUrl: './confirm-cancel-dialog.component.html',
  styleUrls: ['./confirm-cancel-dialog.component.css']
})
export class ConfirmCancelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmCancelDialogComponent>, private payWizardService: PayWizardService) { }

  ngOnInit(): void {}

  onNoClick(): void {
    var request = {"unsubscribe": "N"};
    this.dialogRef.close(request);
  }

  onYesClick(): void {
    var request = {"unsubscribe": "Y"};
    this.dialogRef.close(request);
  }

  get termsUrl(): string {
    return environment.termsUrl;
  }

  get effectiveDate(): string {
    if (this.payWizardService.getNextBillingDate()){
      return "from "+this.payWizardService.getNextBillingDate();
    } else {
      return "immediately";
    }
  }

}
