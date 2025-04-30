import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../../wizard.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { InvitedUserProfile } from '../../user-profile-models';

@Component({
  selector: 'invite-users-step',
  templateUrl: './invite-users-step.component.html',
  styleUrls: ['./invite-users-step.component.css']
})
export class InviteUsersStepComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    errorMessage!: string;
    loading!: boolean;
    users!: InvitedUserProfile[];
    username!: FormControl;
    email!: FormControl;

    constructor(private wizardService: WizardService, private router: Router) { }

    ngOnInit() {
        // the following bypasses the invite users tab until further notice
        this.wizardService.triggerClientEvent('accept_permissions');
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.username = new FormControl('', [Validators.required]);
        this.email = new FormControl('', [Validators.required, Validators.email]);
        this.errorMessage = "";
        this.loadUsers();
    }

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }

    loadUsers(){
        this.loading = true;
        this.wizardService.getCompanyUsers()
        .then((users: any) => {
            this.loading = false;
            this.users = users
        })
        .catch(error => {
            this.loading = false;
            this.errorMessage = error
        });
    }

    invite(){
        if (this.email.invalid || this.username.invalid) {
            this.errorMessage = "Your entry is invalid";
            return;
        }
        this.loading = true;
        this.wizardService.inviteNewUser(this.username.value, this.email.value)
            .then((result: any) => {
                console.log(result)
            })
            .catch(error => {
                this.loading = false;
                this.errorMessage = error
            });
    }

    next(){
        this.wizardService.triggerClientEvent('accept_permissions');
    }


    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }
}
