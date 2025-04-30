import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';

import { TimesheetsService } from '../timesheets.service';
import { Timesheet } from '../timesheets-models';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {
    
    timesheet!: Timesheet;
    error: string = "";

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private timesheetService: TimesheetsService) { }

    ngOnInit(): void {
        this.timesheet = this.data.timesheet;
    }

    onDeny(): void {
        this.dialog.closeAll();
    }

    onConfirm(): void {
        this.error = '';
        var id = this.timesheet.id;
        this.timesheetService.acceptTimesheet(id).subscribe(data => {
            console.log(data);
            this.dialog.closeAll();
        }, error => {
            console.log(error);
            this.error = error;
        })
    }


}
