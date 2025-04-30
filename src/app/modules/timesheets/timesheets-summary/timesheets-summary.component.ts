import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from '../timesheets.service';
// import { error } from 'protractor';
import { TimesheetSummary, TimesheetSummaryQuery } from '../timesheets-models';

@Component({
    selector: 'app-timesheets-summary',
    templateUrl: './timesheets-summary.component.html',
    styleUrls: ['./timesheets-summary.component.css']
})
export class TimesheetsSummaryComponent implements OnInit {

    private today = new Date();
    dateFrom: Date = new Date(new Date().setMonth(this.today.getMonth()-1));
    dateTo: Date = this.today;
    client!: string;
    contracts: any = [];
    timesheets!: TimesheetSummary;
    error: string = "";
    loading: boolean = false;
    downloading: boolean = false;

    constructor(private timesheetService: TimesheetsService) { }

    ngOnInit() {
        this.queryTimesheets();
    }

    download(): void{
        this.downloading = true;
        this.timesheetService.downloadTimesheetReport(this.timesheets.downloadLink).subscribe(pdf => {
            var newBlob = new Blob([pdf], { type: "application/pdf" });
            const winNav = (window.navigator as any)
            if (winNav && winNav.msSaveOrOpenBlob) {
                winNav.msSaveOrOpenBlob(newBlob);
                return;
            }
          
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = this.timesheets.downloadLink;
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            this.downloading = false;
            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
    }

    queryTimesheets(): void {
        var params: TimesheetSummaryQuery = {
            startDate: this.formatDate(this.dateFrom),
            endDate: this.formatDate(this.dateTo)
        }
        this.loading = true;
        this.error = "";
        this.timesheetService.timesheetsReports(params).subscribe(data => {
            console.log(data);
            this.loading = false;
            this.timesheets = data;
        }, error => {
            console.log(error);
            this.loading = false;
           
        })
    }

    get hasData(): boolean {
        return this.timesheets != null;
    }

    get hasError(): boolean {
        return this.error.length > 0;
    }

    get total(): number {
        let total = 0;
        this.timesheets.timesheetEntries.forEach(entry => {
            total = total + entry.minutes;
        });
        return total;
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
