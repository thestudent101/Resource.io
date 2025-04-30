import { Component, OnInit } from '@angular/core';
import { InvoicingService } from '../invoicing.service';
import { ClientContract, InvoiceListSummary, InvoiceQueryModel } from '../invoicing-models';


@Component({
    selector: 'app-client-invoicing',
    templateUrl: './client-invoicing.component.html',
    styleUrls: ['./client-invoicing.component.css']
})
export class ClientInvoicingComponent implements OnInit {

    // 
    private today = new Date();
    contractId!: string;
    startDate: Date = new Date(new Date(new Date().setMonth(this.today.getMonth()-3)).setDate(1));
    endDate: Date = this.today;
    error: string = "";

    contracts: ClientContract[] = []
    invoices: InvoiceListSummary[] = []
    downloading: boolean = false;


    constructor(private invoicingService: InvoicingService) { }

    ngOnInit() {
        this.getCompanyContracts()
    }

    trackByInvoice(index: number, item: InvoiceListSummary){
        console.log(index, item);
        return item.invoiceNumber;
    }

    download(downloadLink: string): void{
        this.downloading = true;
        this.invoicingService.downloadInvoice(downloadLink).subscribe(pdf => {
            var newBlob = new Blob([pdf], { type: "application/pdf" });
            const winNav = (window.navigator as any)
            if (winNav && winNav.msSaveOrOpenBlob) {
                winNav.msSaveOrOpenBlob(newBlob);
                return;
            }
            const data = window.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = data;
            link.download = downloadLink;
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

    loadInvoices(): void {
        var data: InvoiceQueryModel = {
            contract: this.contractId,
            startDate: this.formatDate(this.startDate),
            endDate: this.formatDate(this.endDate)
        }
        this.invoicingService.invoicingContracts(data).subscribe(data => {
            console.log(data);
            this.invoices = data.invoiceListSummary;
            console.log(this.invoices);
        }, error => {
            console.log(error);
            this.error = error;
        })
    }

    private loadThreeMonthsInvoices(){
        this.contractId = this.contracts[0].contractId;
        this.loadInvoices();
    }

    private getCompanyContracts(): void {
        var companyName = 'Health Care Solutions'
        this.invoicingService.getclientContracts(companyName).subscribe(data => {
            console.log(data);
            this.contracts = data.clientContracts;
            this.loadThreeMonthsInvoices();
        }, error => {
            console.log(error);
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
}
