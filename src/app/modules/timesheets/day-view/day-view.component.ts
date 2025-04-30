import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from '../timesheets.service';
import { DailyTimesheets, Contract, TimesheetEntry, Timesheet } from '../timesheets-models';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {

    date: Date = new Date();
    error: string = "";
    loading: boolean = false;
    contracts: Contract[] = [];
    addNewTimeEntry: boolean = false;
    currentEditTimesheetId: string = "";
    isMobile: boolean = false;

    constructor(private timesheetsService: TimesheetsService) { }

    ngOnInit(): void {
        this.loadTimeEntriesPerDay();
        this.checkScreen();
    }

    onPrevDate(): void {
        this.date = new Date(this.date.setDate(this.date.getDate() - 1))
        this.loadTimeEntriesPerDay();
    }

    checkScreen(): void {
        if (screen.width <= 450) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
 
    }

    onNextDate(): void {
        this.date = new Date(this.date.setDate(this.date.getDate() + 1))
        this.loadTimeEntriesPerDay();
    }

    datePickerChanged(): void {
        this.loadTimeEntriesPerDay();
    }

    isEditingTimesheet(timesheet: Timesheet): boolean{
        return this.currentEditTimesheetId === timesheet.id;
    }

    onEditEntry(timesheet: Timesheet){
        if (this.currentEditTimesheetId) {
            this.currentEditTimesheetId = ""
        } else {
            this.currentEditTimesheetId = timesheet.id
        }
    }

    onDeleteEntry(timesheet: Timesheet){
        this.loading = true;
        this.error = "";
        this.timesheetsService.deleteTimesheet(timesheet.id).subscribe(() => {
            this.loading = false;
            this.loadTimeEntriesPerDay();
          }, error => {
            console.log(error);
            this.error = error;
            this.loading = false;            
          })
    }

    toggleAddView(){
        this.addNewTimeEntry = !this.addNewTimeEntry;
    }

    timesheetEditComplete(success: boolean){
        if (success) {
            this.addNewTimeEntry = false;
            this.currentEditTimesheetId = "";
            this.loadTimeEntriesPerDay();
        } 
    }

    get hasData(): boolean {
        return this.contracts.length > 0;
    }

    get hasError(): boolean {
        return this.error.length > 0;
    }

    get total(): number {
        let total = 0;
        this.contracts.forEach(contract => {
            contract.timesheets.forEach(timesheet => {
                total = total + timesheet.minutes;
            });
        });
        return total;
    }

    private loadTimeEntriesPerDay() {
        this.loading = true;
        this.error = "";
        this.timesheetsService.getDailyTimesheet(this.formatDate(this.date)).subscribe(data => {
            this.contracts = data.contracts
            this.loading = false;
        }, error => {
            console.log('we got an error here: ' + error);
            this.contracts = [];
            this.loading = false;
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

}
