import { Injectable, Inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session.service';
import { BASE_URL } from 'src/app/app.provider';
import { TimesheetSummary, TimesheetReferenceData, TimesheetSummaryQuery, DailyTimesheets, ClientContractList, SubmittedTimesheets, ClientTimesheetWeekView, ContractorTimesheetWeekView, ContractorBillingSummary } from './timesheets-models';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TimesheetsService {
  // URLs
  private dayTimesheetUrl = this.baseUrl + '/billing/timesheets-by-date';
  private newTimesheetEntryUrl = this.baseUrl + '/billing/timesheet';
  private editTimesheetEntryUrl = this.baseUrl + '/billing/timesheet';
  private contractRefDataUrl = this.baseUrl + '/billing/contracts';
  private deleteTimesheetEntryUrl = this.baseUrl + '/billing/timesheet';
  private acceptTimesheetUrl = this.baseUrl + '/billing/accept-timesheet';
  private rejectTimesheetUrl = this.baseUrl + '/billing/reject-timesheet';
  private timesheetsReportUrl = this.baseUrl + '/billing/timesheet-report';
  private clientContractsUrl = this.baseUrl + '/billing/client-contracts?companyName=';
  private submittedTimesheetsUrl = this.baseUrl + '/billing/submitted-timesheets?contractId=';
  
  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient) { }
  
  getDailyTimesheet(date: string): Observable<DailyTimesheets> {
    var postData = {
      date: date
    }
    return this.http.post<DailyTimesheets>(this.dayTimesheetUrl, JSON.stringify(postData))
  }

  newTimesheetEntry(postData:any) {
    return this.http.post(this.newTimesheetEntryUrl, JSON.stringify(postData))
  }

  editTimesheetEntry(postData:any) {
    return this.http.put(this.editTimesheetEntryUrl, JSON.stringify(postData))
  }

  deleteTimesheet(id: string) {
    return this.http.delete(this.deleteTimesheetEntryUrl + '/' + id)
  }

  getClientContracts(companyName: string): Observable<ClientContractList> {
    return this.http.get<ClientContractList>(this.clientContractsUrl + companyName)
    .pipe(response => response)
    .pipe(retry(1));    
  }
  
  getSubmittedtimesheets(contractId: string): Observable<SubmittedTimesheets>{
      return this.http.get<SubmittedTimesheets>(this.submittedTimesheetsUrl + contractId)
      .pipe(response => response)
      .pipe(retry(1));    
  }

  rejectTimesheet(id: string, reason: string) {
    var postData = {
      timesheetEntryId: id,
      rejectionReason: reason
    }
    return this.http.post(this.rejectTimesheetUrl, JSON.stringify(postData))
  }
  
  acceptTimesheet(id:any) {
    var postData = {
      timesheetEntryId: id,
    }
    return this.http.post(this.acceptTimesheetUrl, JSON.stringify(postData))
  }

  getContractData(): Observable<TimesheetReferenceData> {
    return this.http.get<TimesheetReferenceData>(this.contractRefDataUrl)
    .pipe(response => response)
    .pipe(retry(1));    
  }

  timesheetsReports(data: TimesheetSummaryQuery): Observable<TimesheetSummary> {
    return this.http.get<TimesheetSummary>(this.timesheetsReportUrl + '/' + data.startDate + '/' + data.endDate)
    .pipe(response => response)
    .pipe(retry(1));    
  }

  downloadTimesheetReport(url: string): Observable<Blob> {
    return this.http.get(this.baseUrl + url, { responseType: 'blob' })
    .pipe(response => response)
    .pipe(retry(1));    
  }

  getContractorWeeklyTimesheetsAsClient(companyName: string, fromDate: string, toDate: string): Observable<ClientTimesheetWeekView>{
    return this.http.get<ClientTimesheetWeekView>(this.baseUrl + '/billing/client-timesheet-week-view/' + companyName + '/' + fromDate + '/' + toDate)    
    .pipe(response => response)
    .pipe(retry(1));    
  }

  getContractorWeeklyTimesheets(fromDate: string, toDate: string): Observable<ContractorTimesheetWeekView>{
    return this.http.get<ContractorTimesheetWeekView>(this.baseUrl + '/billing/contractor-timesheet-week-view/' + fromDate + '/' + toDate)    
    .pipe(response => response)
    .pipe(retry(1));    
  }

  getContractorBillingSummary(companyName: string): Observable<ContractorBillingSummary>{
    return this.http.get<ContractorBillingSummary>(this.baseUrl + '/billing/client-contractor-billing-summary/' + companyName)    
    .pipe(response => response)
    .pipe(retry(1));    
  }
}
