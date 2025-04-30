import { Component, OnInit, Inject } from '@angular/core';
import { Timesheet } from '../timesheets-models';
import { MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { TimesheetsService } from '../timesheets.service';

@Component({
    selector: 'app-admin-rejection',
    templateUrl: './admin-rejection.component.html',
    styleUrls: ['./admin-rejection.component.css']
})
export class AdminRejectionComponent implements OnInit {

    timesheet!: Timesheet;
    error: string = "";
    reason: string = "";

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
        this.timesheetService.rejectTimesheet(id, this.reason).subscribe(data => {
            console.log(data);
            this.dialog.closeAll();
        }, error => {
            console.log(error);
            this.error = error;
        })
    }
}