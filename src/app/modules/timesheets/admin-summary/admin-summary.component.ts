import { Component, OnInit } from '@angular/core';
import { TimesheetsService } from '../timesheets.service';
import { ClientContract } from '../../invoicing/invoicing-models';
import { TimesheetEntry, ContractorSummary } from '../timesheets-models';
import { SessionService } from 'src/app/shared/session.service';

@Component({
    selector: 'app-admin-summary',
    templateUrl: './admin-summary.component.html',
    styleUrls: ['./admin-summary.component.css']
})
export class AdminSummaryComponent implements OnInit {
    
    contractorSummary: ContractorSummary[] = []
    error: string = "";
    loading: boolean = false;
    contractCounter = 0;

    constructor(private timesheetService: TimesheetsService, private sessionService: SessionService) { }

    ngOnInit(): void {
        this.loadContracts();
    }
    
    get hasSummary(): boolean {
        return this.contractorSummary.length > 0;
    }

    private loadContracts() {
        let companyName = this.sessionService.getUserProfile().company.name;
        this.contractorSummary = [];
        this.timesheetService.getContractorBillingSummary(companyName).subscribe(data => {
            this.contractorSummary = data.contractorSummary;
        }, error => {
            console.log(error);
            this.contractorSummary = [];
        })
    }
}
