import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimesheetReferenceData, Timesheet } from '../timesheets-models';
import { TimesheetsService } from '../timesheets.service';

@Component({
    selector: 'app-timesheet-editor',
    templateUrl: './timesheet-editor.component.html',
    styleUrls: ['./timesheet-editor.component.css']
})
export class TimesheetEditorComponent implements OnInit {

    referenceData!: TimesheetReferenceData;
    @Input() date: Date = new Date();
    @Input() timesheet!: Timesheet;
    @Input() contract: string = '';
    description: string = '';
    activity: string = '';
    minutes: number = 0;
    error: string = "";
    id: string = "";
    @Output() complete: EventEmitter<boolean> = new EventEmitter();

    constructor(private timesheetService: TimesheetsService) { }

    ngOnInit(): void {
        this.initRefData();
        this.getReferenceData();
        console.log(this.contract);
        if (this.timesheet) {
            this.description = this.timesheet.description;
            this.minutes = this.timesheet.minutes;
            this.activity = this.timesheet.activity;
            this.id = this.timesheet.id;
        }
    }

    submitTimeEntry() {
        if (this.timesheet && this.id){
            this.updateTimesheetEntry();
        } else {
            this.createTimesheetEntry();
        }
    }

    private initRefData() {
        this.referenceData = {
            contracts: []
        }
    }

    private getReferenceData(): void {
        this.timesheetService.getContractData().subscribe((data) => {
            this.referenceData = data;
        }, error => {
            this.error = error;
        })
    }

    private formatDate(date: Date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }

    private createTimesheetEntry() {
        var postData = {
            contractId: this.contract,
            timesheet: {
                date: this.formatDate(this.date),
                minutes: this.minutes,
                description: this.description,
                activity: this.activity,
                status: 0,
            }
        }
        this.timesheetService.newTimesheetEntry(postData).subscribe(() => {
            console.log();
            this.complete.emit(true);
        }, error => {
            this.error = error;
            this.complete.emit(false);
        })
    }

    private updateTimesheetEntry() {
        var editedEntryData = {
            timesheetId: this.id,
            contractId: this.contract,
            timesheet: {
                date: this.formatDate(this.date),
                minutes: this.minutes,
                description: this.description,
                activity: this.activity,
                status: 0,
            }
        }
        this.timesheetService.editTimesheetEntry(editedEntryData).subscribe(() => {
            console.log();
            this.complete.emit(true);
        }, error => {
            this.error = error;
            this.complete.emit(false);
        })
    }

}
