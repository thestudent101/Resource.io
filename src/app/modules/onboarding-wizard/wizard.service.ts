import { Injectable } from '@angular/core';
import { AuthenticationManagementService } from 'src/app/authentication-management.service';
import { SessionService } from 'src/app/shared/session.service';
import { CognitoError } from 'src/app/shared/http-error-handler';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserManagementService } from './user-management.service';
import { ClientRegisterStep, ContractorRegisterStep, AuthData, LoginStep, ForgotPasswordStep, InvitedUserProfile, CompanyProfile, UserType, RegistrationStatusEnum, UserTypeEnum } from './user-profile-models';
import { DataService } from 'src/app/shared/data.service';
import { UserProfileData } from '../contractor-profile/user-profile-data';

@Injectable({
    providedIn: 'root'
})
export class WizardService {
    private loginStep: LoginStep = 'login';
    private clientStep: ClientRegisterStep = 'register';
    private contractorStep: ContractorRegisterStep = 'register';
    private authData: AuthData = { email: "", password: "", userType: 'client'};
    private cellNumber!: string;
    private clientProfile: any = {};
    private contractorProfile: any = {};
    private loginSubject: Subject<LoginStep> = new Subject();
    private registerClientSubject: Subject<ClientRegisterStep> = new Subject();
    private registerContractorSubject: Subject<ContractorRegisterStep> = new Subject();
    private forgotPasswordSubject: BehaviorSubject<ForgotPasswordStep> = new BehaviorSubject<any>('forgot_password');
    private errorSubject: BehaviorSubject<string> = new BehaviorSubject('');
    loginEvent$ = this.loginSubject.asObservable();
    registerClientEvent$ = this.registerClientSubject.asObservable();
    registerContractorEvent$ = this.registerContractorSubject.asObservable();
    forgotPasswordEvent$ = this.forgotPasswordSubject.asObservable();
    errorEvent$ = this.errorSubject.asObservable();

    constructor(private authManagementService: AuthenticationManagementService, private sessionService: SessionService, private userManagementService: UserManagementService, private dataClass: DataService) { }

    setAuthData(email: string, password: string){
        this.authData.email = email;
        this.authData.password = password;
    }

    clearAuthData(){
        this.authData.email = "";
        this.authData.email = "";
        // Also clear the cell number
        this.clearCellNumber();
    }

    setCellNumber(cellnumber: string){
        this.cellNumber = cellnumber;
    }

    clearCellNumber(){
        this.cellNumber = "";
    }

    reset(){
        this.loginStep = 'login';
        this.clientStep = 'register';
        this.contractorStep = 'register';
    }

    login(email: string, password: string) {
        this.setAuthData(email,password);
        this.sessionService.setUsername(email);
        this.authManagementService.signIn(email, password)
            .subscribe(() => {
                this.getUserProfile();
                this.clearAuthData();
            }, (loginError: CognitoError) => {
                console.log(loginError);
                if (loginError.message == 'User is not confirmed.') {
                    this.resendVerificationCode();
                    this.loginSubject.next('verify_email');
                } else {
                    this.authManagementService.triggerEvent(false);
                    this.errorSubject.next(loginError.message);
                }
            });
    }

    verifyEmailAddress(verificationCode: string) {
        let email = this.sessionService.getUsername();
        this.authManagementService.confirmSignUpLogin(email, verificationCode).subscribe(() => {
            this.updateUserStatus(email, RegistrationStatusEnum.VERIFIED);
            this.loginSubject.next('verify_email_complete');
            this.registerContractorSubject.next('verify_email_complete');
            this.registerClientSubject.next('verify_email_complete');
        }, (verifyEmailAddressError: CognitoError) => {
            console.log(verifyEmailAddressError);
            this.errorSubject.next(verifyEmailAddressError.message);
        })
    }

    resendVerificationCode() {
        let email = this.sessionService.getUsername();
        this.authManagementService.resendCodeForUser(email).catch((resendVerificationCodeError: CognitoError) => {
            console.log(resendVerificationCodeError);
            this.errorSubject.next(resendVerificationCodeError.message);
        });
    }

    requestPasswordReset(email: string) {
        this.authManagementService.forgotPassword(email).then(() => {
            this.sessionService.setUsername(email);
            this.forgotPasswordSubject.next('create_password');
        }).catch((forgotPasswordError: CognitoError) => {
            console.log(forgotPasswordError);
            this.errorSubject.next(forgotPasswordError.message);
        });
    }

    resetPassword(code: string, password: string) {
        let email = this.sessionService.getUsername();
        this.authManagementService.forgotPasswordSubmit(email, code, password)
            .then(() => {
                this.forgotPasswordSubject.next('login');
            })
            .catch((resetPasswordError: CognitoError) => {
                console.log(resetPasswordError);
                this.errorSubject.next(resetPasswordError.message);
            });
    }

    register() {
        this.authManagementService.signUp(this.authData.email, this.authData.password)
            .subscribe(() => {
                this.registerContractorSubject.next('verify_email');
                this.registerClientSubject.next('verify_email');
                this.sessionService.setUsername(this.authData.email);
                this.sessionService.setCellnumber(this.cellNumber);
                this.sessionService.setUserType(this.authData.userType.toString());
            }, (registerUserError: CognitoError) => {
                console.log(registerUserError);
                this.errorSubject.next(registerUserError.message);
            });
    }

    manualLogin() {        
        this.authManagementService.signIn(this.authData.email, this.authData.password)
            .subscribe(() => {
                this.loginSubject.next('load_user_details');
                this.registerContractorSubject.next('contractor_profile');
                this.registerClientSubject.next('client_profile');
                this.clearAuthData();
            }, (loginError: CognitoError) => {
                this.errorSubject.next(loginError.message);
            });
    }

    createClientProfile() {
        let email = this.sessionService.getUsername();
        this.clientProfile.emailAddress = email;
        console.log(this.clientProfile);
        this.userManagementService.createClientProfile(this.clientProfile).subscribe((response) => {
            this.registerClientSubject.next('accept_permissions')
            this.updateUserStatus(email, RegistrationStatusEnum.COMPLETE);
        }, (updateClientProfileError) => {
            console.log(updateClientProfileError);
            this.errorSubject.next(updateClientProfileError.error.message);
        })
    }

    loadClientProfile(){
        this.sessionService.loadClientProfile().subscribe(() => {
            this.loginSubject.next('accept_permissions');
        }, (clientValidationError:any) => {
            console.log(clientValidationError);
            this.errorSubject.next(clientValidationError.error.message);
        })
    }

    createContractorProfile() {
        let email = this.sessionService.getUsername();
        this.contractorProfile.email = email;
        this.userManagementService.createContractorProfile(this.contractorProfile).subscribe(() => {
            this.registerContractorSubject.next('accept_permissions');
            this.updateUserStatus(email, RegistrationStatusEnum.COMPLETE);
        }, (createContractorError) => {
            console.log(createContractorError);
            this.errorSubject.next(createContractorError.error.message);
        })
    }

    loadContractorProfile(){
        this.sessionService.loadContractorProfile().subscribe(() => {
            this.loginSubject.next('accept_permissions');
        }, (contractorValidationError: any) => {
            console.log(contractorValidationError);
            this.errorSubject.next(contractorValidationError.error.message);
            
        });
    }

    getCompanyUsers() {
        return new Promise((resolve, reject) => {
            this.userManagementService.getCompanyUsers(this.sessionService.getUsername())
                .subscribe((users: InvitedUserProfile[]) => resolve(users), error => reject(error))
        });
    }

    getCompanyDetails(companyRegistrationNumber: string){
        return new Promise((resolve, reject) => {
            this.userManagementService.getCompanyDetails(companyRegistrationNumber)
                .subscribe((profile: CompanyProfile) => resolve(profile), error => reject(error))
        });
    }

    requestToJoinCompany(userEmail: string, companyName: string, companyRegistrationNumber: string){
        let profileData: any = {
            userEmail: userEmail,
            companyName: companyName,
            companyRegistrationNumber: companyRegistrationNumber
        };
        return new Promise((resolve, reject) => {
           this.userManagementService.requestToJoinCompany(profileData)
                .subscribe((result) => resolve(result), error => reject(error))
        });
    }

    inviteNewUser(name: string, email: string) {
        var postData = {
            userName: name,
            userEmail: email
        }
        return new Promise((resolve, reject) => {
            this.userManagementService.inviteNewUser(postData, this.sessionService.getUsername())
                .subscribe((result) => resolve(result), error => reject(error))
        });
    }

    createUserProfile(email: string, cellnumber: string, password: string, type: UserType){
        this.setAuthData(email, password);
        this.setCellNumber(cellnumber);
        let userType: UserTypeEnum = (type === 'client')? UserTypeEnum.CLIENT : UserTypeEnum.CONTRACTOR;
        let userProfile = {
            emailAddress: email,
            cellNumber: cellnumber,
            type: userType,
            status: RegistrationStatusEnum.UNVERIFIED
        }
        this.userManagementService.createUserProfile(userProfile)
            .subscribe((res:any) => {
                console.log("Response: ", res);
                
                console.log("User type",type);
                
                if (type === 'client') this.registerClientSubject.next('cognito_profile');
                if (type === 'contractor') this.registerContractorSubject.next('cognito_profile');   
            }, (error) => {
                console.error(error);
                this.errorSubject.next(error.error.message);
            });
    }

    updateUserStatus(emailAddress: string, status: RegistrationStatusEnum){
        let userProfile = {
            status: status
        }
        this.userManagementService.updateUserProfile(userProfile, emailAddress)
            .subscribe((result) => {
                console.log(result)
            }, (error) => {
                console.error(error);
                this.errorSubject.next(error.error.message);
            });
    }

    getUserProfile(){
        let emailAddress = this.sessionService.getUsername();
        this.userManagementService.retrieveUserProfile(emailAddress)
            .subscribe((profile) => {
                if (profile.status === "COMPLETE"){
                    this.sessionService.setUserProfileComplete();
                    this.authManagementService.triggerEvent(true);
                    if (profile.type === "CLIENT") this.loadClientProfile();
                    if (profile.type === "CONTRACTOR") this.loadContractorProfile();
                } else if (profile.status === "VERIFIED") {
                    if (profile.type === "CLIENT") {
                        this.sessionService.setUserType('client');
                        this.loginSubject.next('client_incomplete');
                    }
                    if (profile.type === "CONTRACTOR") {
                        this.sessionService.setUserType('contractor');
                        this.loginSubject.next('contractor_incomplete');
                    }
                } else {
                    this.errorSubject.next("Could not determine your profile state. Please contact support");
                }
            }, (error) => {
                console.error(error);
                this.errorSubject.next(error.error.message);
            });
    }

    clearClientProfile() {
        this.clientProfile = {};
    }

    setClientProfile(profile: any) {
        this.clientProfile = { ...this.clientProfile, ...profile };
    }

    getClientProfile() {
        return this.clientProfile;
    }

    setClientStep(step: ClientRegisterStep){
        this.clientStep = step;
    }

    clearContractorProfile() {
        this.contractorProfile = {};
    }

    setContractorProfile(profile: any) {
        this.contractorProfile = { ...this.contractorProfile, ...profile };
    }

    getContractorProfile() {
        return this.contractorProfile;
    }

    setContractorStep(step: ContractorRegisterStep){
        this.contractorStep = step;
    }

    getLoginStep(): LoginStep {
        return this.loginStep;
    }

    getClientStep(): ClientRegisterStep{
        return this.clientStep;
    }
    
    getContractorStep(): ContractorRegisterStep{
        return this.contractorStep;
    }

    triggerClientEvent(step: ClientRegisterStep) {
        this.registerClientSubject.next(step);
    }

    triggerContractorEvent(step: ContractorRegisterStep){
        this.registerContractorSubject.next(step);
    }

    skip() {
        this.registerContractorSubject.next('accept_permissions');
        this.registerClientSubject.next('accept_permissions');
    }

    getUserName(): string {
        return this.sessionService.getUsername();
    }

    getCellNumber(): string {
        return this.sessionService.getCellnumber();
    }

    getLevels(){
        return UserProfileData.levels();
    }

    getTitles(){
        return UserProfileData.titles();
    }

    loadSkills(){
        this.dataClass.setSkills();
    }

    getSkills(){
        return this.dataClass.getSkills();
    }
}