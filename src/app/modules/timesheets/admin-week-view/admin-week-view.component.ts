import { Component, OnInit } from '@angular/core';
import { ClientRow, Entry } from '../timesheets-models';
import { TimesheetsService } from '../timesheets.service';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-admin-week-view',
  templateUrl: './admin-week-view.component.html',
  styleUrls: ['./admin-week-view.component.css']
})
export class AdminWeekViewComponent implements OnInit {

    date: Date = new Date();
    days: Date[] = [];
    contractWeekViews: ClientRow[] = [];
    loading: boolean = false;

    constructor(private timesheetsService: TimesheetsService, private sessionService: SessionService) {
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

    getColumnTotal(contract: ClientRow, date: Date): number{
        let total = 0;
        contract.activityAggregate.forEach(activity => {
            activity.entries.forEach(entry => {
                if (entry.date == this.formatDate(date)) total += entry.minutes;
            })
        })
        return total;
    }

    getTableTotal(contract: ClientRow): number {
        let total = 0;
        contract.activityAggregate.forEach(activity => {
            activity.entries.forEach(entry => {
                total += entry.minutes;
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
        let companyName = this.sessionService.getUserProfile().company.name;
        this.timesheetsService.getContractorWeeklyTimesheetsAsClient(companyName, this.formatDate(this.days[0]), this.formatDate(this.days[6])).subscribe(data => {
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
