import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { SessionService } from '../../../shared/session.service';
import { ClientProfileService } from '../client-profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-client-profile',
    templateUrl: './client-profile.component.html',
    styleUrls: ['./client-profile.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ClientProfileComponent implements OnInit {
    isMobile = false;
    addUser = true;
    newUserEmail = '';
    newUserName = '';
    error = "";
    users: any[]=[];
    requestedUsers: any;
    profile: any;
    isLoading!: boolean;

    infoStep = 1;

    constructor(private sessionClass: SessionService, private snackBar: MatSnackBar, private clientProfileService: ClientProfileService) { }

    ngOnInit() {
        this.loadProfile();
        this.getUsers();
        this.getRequestedUsers();
        if (window.innerWidth <= 400) {
            this.isMobile = true;
        }
    }

    get username(): string {
        return this.sessionClass.getUsername();
    }

    get hasProfile(): boolean {
        return this.profile != null;
    }

    onAddUser() {
        this.addUser = false;
    }
    onCancelUser() {
        this.addUser = true;
    }

    onInviteUser() {
        this.clientProfileService.inviteNewUser(this.newUserEmail, this.newUserName).subscribe(() => {
            this.addUser = true;
            this.getUsers();
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status != 404) {
                this.error = error.error.message
            }
        });
    }

    onApproveRequest() {
        this.clientProfileService.approveClientRequest(this.profile.company.name, this.profile.company.registrationNumber).subscribe(() => {
            this.addUser = true;
            this.getUsers();
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status != 404) {
                this.error = error.error.message
            }
        });
    }

    private loadProfile() {
        this.isLoading = true;
        this.clientProfileService.loadProfile().subscribe(response => {
            this.profile = response;
            this.isLoading = false;
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status == 404) {
                this.profile = null;
            } else {
                this.error = error.error.message
            }
        });
    }

    private getUsers() {
        this.clientProfileService.getCompanyUsers().subscribe((data) => {
            this.users = data;
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status != 404) {
                this.error = error.error.message
            }
        });
    }

    private getRequestedUsers() {
        this.clientProfileService.getRequestedUsers().subscribe((data) => {
            this.requestedUsers = data;
        }, error => {
            console.log(error);
            this.isLoading = false;
            if (error.status != 404) {
                this.error = error.error.message
            }
        });
    }

    setStep(val: number): void {
        this.infoStep = val;
    }
}
