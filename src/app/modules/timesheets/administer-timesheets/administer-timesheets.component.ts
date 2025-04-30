import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimesheetsService } from '../timesheets.service';
import { Timesheet, ClientContract, TimesheetEntry } from '../timesheets-models';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AdminRejectionComponent } from '../admin-rejection/admin-rejection.component';
import { AdminApprovalComponent } from '../admin-approval/admin-approval.component';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/shared/session.service';

@Component({
    selector: 'app-administer-timesheets',
    templateUrl: './administer-timesheets.component.html',
    styleUrls: ['./administer-timesheets.component.css']
})
export class AdministerTimesheetsComponent implements OnInit, OnDestroy {

    private dialogSubscription!: Subscription;
    contracts: ClientContract[] = []
    timesheets: TimesheetEntry[] = [];
    contractId: string = "";
    error: string = "";
    loading: boolean = false;
    openDialog!: MatDialogRef<any>;

    constructor(private dialog: MatDialog, private timesheetService: TimesheetsService, private sessionService: SessionService) { }

    ngOnInit(): void {
        this.loadContracts();
    }

    ngOnDestroy(): void {
        if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
    }

    loadTimesheets(){
        this.loadAvailableTimesheets();
    }

    rejectTimesheet(timesheet: Timesheet) {
        this.openDialog = this.dialog.open(AdminRejectionComponent, {
            data: { timesheet: timesheet },
        });
        this.dialogRefHandler();
    }

    acceptTimesheet(timesheet: Timesheet) {
        this.openDialog = this.dialog.open(AdminApprovalComponent, {
            data: { timesheet: timesheet },
        });
        this.dialogRefHandler();
    }

    get hasTimesheets(): boolean {
        return this.timesheets.length > 0;
    }

    private dialogRefHandler(){
        this.dialogSubscription = this.openDialog.afterClosed().subscribe(result => {
            this.loadTimesheets();
          });
    }

    private loadContracts(){
        let companyName = this.sessionService.getUserProfile().company.name;
        this.loading = true;
        this.error = "";
        this.timesheetService.getClientContracts(companyName).subscribe(data => {
            this.loading = false;
            this.contracts = data.clientContracts;
            this.contractId = this.contracts[0].contractId;
            this.loadAvailableTimesheets()
        }, error => {
            console.log(error);
            this.contracts = [];
            this.loading = false;
            this.error = error
        })
    }

    private loadAvailableTimesheets(){
        this.loading = true;
        this.error = "";
        this.timesheetService.getSubmittedtimesheets(this.contractId).subscribe(data => {
            this.loading = false;
            this.timesheets = data.timesheetEntries;
        }, error => {
            console.log(error);
            this.timesheets = [];
            this.loading = false;
            this.error = error
        })
    }
}
