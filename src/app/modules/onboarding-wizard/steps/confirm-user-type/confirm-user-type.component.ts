import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../../wizard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'confirm-user-type-step',
  templateUrl: './confirm-user-type.component.html',
  styleUrls: ['./confirm-user-type.component.css']
})
export class ConfirmUserTypeComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    private clientSubscription!: Subscription;
    private contractorSubscription!: Subscription;
    errorMessage!: string;
    loading!: boolean;

    constructor(private wizardService: WizardService, private router: Router) { }

    ngOnInit() {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.errorMessage = "";
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
        if (this.clientSubscription) this.clientSubscription.unsubscribe();
        if (this.contractorSubscription) this.contractorSubscription.unsubscribe();
    }

    selectContractor(){
        this.loading = true;
        this.wizardService.createContractorProfile();
    }

    selectClient(){
        this.loading = true;
        this.wizardService.createClientProfile();
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}
