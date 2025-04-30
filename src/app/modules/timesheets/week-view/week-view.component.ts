import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from '../timesheets.service';
import { DailyTimesheets, Contract, Timesheet, ContractorRow, Entry } from '../timesheets-models';

@Component({
    selector: 'app-week-view',
    templateUrl: './week-view.component.html',
    styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {

    date: Date = new Date();
    days: Date[] = [];
    contractWeekViews: ContractorRow[] = [];
    loading: boolean = false;

    constructor(private timesheetsService: TimesheetsService) {
    }

    ngOnInit(): void {
        this.getWeekDates();
    }

    isToday(index: number): boolean {
        if (this.days.length === 0) return false;
        return this.date.getTime() === this.days[index].getTime();
    }

    datesMatch(date: string, day: Date): boolean {
        return date === this.formatDate(day);
    }

    onPrevDate(): void {
        this.date = new Date(this.date.setDate(this.date.getDate() - 1))
        this.getWeekDates();
    }

    onNextDate(): void {
        this.date = new Date(this.date.setDate(this.date.getDate() + 1))
        this.getWeekDates();
    }

    datePickerChanged(): void {
        this.getWeekDates();
    }

    reloadItems(){
        this.getWeekDates();
    }

    getMinutesByDate(entries: Entry[], date: Date): number{
        let minutes = 0;
        entries.forEach(entry => {
            if (entry.date == this.formatDate(date)) minutes = entry.minutes;
        })
        return minutes
    }

    getRowTotal(entries: Entry[]): number {
        let total = 0;
        entries.forEach(entry => {
            total += entry.minutes;
        })
        return total;
    }

    getColumnTotal(date: Date): number{
        let total = 0;
        this.contractWeekViews.forEach(contract => {
            contract.activityAggregate.forEach(activity => {
                activity.entries.forEach(entry => {
                    if (entry.date == this.formatDate(date)) total += entry.minutes;
                })
            })
        })
        return total;
    }

    getTableTotal(): number {
        let total = 0;
        this.contractWeekViews.forEach(contract => {
            contract.activityAggregate.forEach(activity => {
                activity.entries.forEach(entry => {
                    total += entry.minutes;
                })
            })
        })
        return total;
    }

    private resetData(){
        this.days = [];
        this.contractWeekViews = [];
    }

    private getWeekDates() { // get current date
        this.resetData();
        this.loading = true;
        let today = new Date(this.date);
        let sunday = today.getDate() - today.getDay(); // First day is the day of the month - the day of the week
        for (let i = 0; i < 7; i++) {
            let day = sunday + i;
            let date = new Date(today.setDate(day));
            this.days.push(date);
        }
        this.loadTimeEntries()
    }

    private loadTimeEntries(){
        this.timesheetsService.getContractorWeeklyTimesheets(this.formatDate(this.days[0]), this.formatDate(this.days[6])).subscribe(data => {
            if (data.endDate == this.formatDate(this.days[6]) &&  data.startDate == this.formatDate(this.days[0])){
                this.contractWeekViews = data.rows;
            }
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log('we got an error here: ' + error);
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