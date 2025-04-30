export interface SignupUserProfile {
    type: string;
    status: string;
}

export enum UserTypeEnum {
    CLIENT,
    CONTRACTOR
}

export enum RegistrationStatusEnum {
    UNVERIFIED,
    VERIFIED,
    COMPLETE
} 

export interface AuthData {
    email: string;
    password: string;
    userType: UserType;
}

export interface CompanyProfile {
    name: string;
    registrationNumber: string;
    webDomainName: string;
    tradingName: string;
}

export interface InvitedUserProfile {
    name: string;
    surname: string;
    emailAddress: string;
    contactNumber: string;
    invitationStatus: string;
    admin: boolean;
}

export type UserType =
    | 'client'
    | 'contractor';

export type LoginStep =
    | 'login'
    | 'verify_email'
    | 'verify_email_complete'
    | 'load_user_details'
    | 'load_user_profile'
    | 'client_incomplete'
    | 'contractor_incomplete'
    | 'accept_permissions';

export type ClientRegisterStep =
    | 'register'
    | 'user_profile'
    | 'cognito_profile'
    | 'verify_email'
    | 'verify_email_complete'
    | 'login_complete'
    | 'client_profile'
    | 'company_profile'
    | 'invite_users'
    | 'accept_invite'
    | 'request_access'
    | 'request_access_complete'
    | 'accept_permissions';

export type ContractorRegisterStep =
    | 'register'
    | 'user_profile'
    | 'cognito_profile'
    | 'verify_email'
    | 'verify_email_complete'
    | 'login_complete'
    | 'contractor_profile'
    | 'contractor_details'
    | 'accept_permissions';

export type ForgotPasswordStep =
    | 'forgot_password'
    | 'create_password'
    | 'login';

export type PaymentStep =
    | 'load_user_profile'
    | 'enroll'
    | 'checkout'
    | 'load_payment_details'
    | 'payment_complete'
    | 'payment_failed';
