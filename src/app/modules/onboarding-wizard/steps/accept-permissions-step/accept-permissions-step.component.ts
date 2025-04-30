import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../../wizard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'accept-permissions-step',
  templateUrl: './accept-permissions-step.component.html',
  styleUrls: ['./accept-permissions-step.component.css']
})
export class AcceptPermissionsStepComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    errorMessage!: string;
    loading!: boolean;

    constructor(private wizardService: WizardService, private router: Router) { }

    ngOnInit() {
        // the following bypasses the permissions tab until further notice
        this.router.navigateByUrl('/main');
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
        this.wizardService.reset();
    }

    requestPermissions(){
        if (confirm('Please accept permissions')){
            this.router.navigateByUrl('/main');
        }
    }

    skipPermissions(){
        this.router.navigateByUrl('/main');
    }

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}
