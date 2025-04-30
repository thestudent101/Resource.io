import { Injectable , Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/shared/session.service';
import { BASE_URL } from 'src/app/app.provider';
import { retry } from 'rxjs/operators';
import { ContractInvoiceList, ClientContractList, InvoiceQueryModel } from './invoicing-models';

@Injectable({
  providedIn: 'root'
})
export class InvoicingService { // charles come check here

  // Urls
  private clientContractsUrl = this.baseUrl + '/billing/client-contracts?companyName=';
  private contractInvoicesUrl = this.baseUrl + '/billing/contract-invoices';

  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient, private sessionClass: SessionService) { }

  getclientContracts(companyName: string): Observable<ClientContractList> {
    return this.http.get<ClientContractList>(this.clientContractsUrl + companyName)
  }

  invoicingContracts(data: InvoiceQueryModel): Observable<ContractInvoiceList> {
    return this.http.get<ContractInvoiceList>(this.contractInvoicesUrl + '/' + data.contract + '/' + data.startDate + '/' + data.endDate  )
    .pipe(response => response)
    .pipe(retry(1));    
  }

  downloadInvoice(url: string): Observable<Blob> {
    return this.http.get(this.baseUrl + url, { responseType: 'blob' })
    .pipe(response => response)
    .pipe(retry(1));    
  }
}
