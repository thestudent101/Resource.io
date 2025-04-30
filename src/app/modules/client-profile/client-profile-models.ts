export interface Company {
    name: string;
    registrationNumber: string;
    webDomainName: any;
    tradingName: any;
    vatNumber: any;
    physicalAddress: any;
    postalAddress: any;
}

export interface ClientProfile {
    name: string;
    surname: string;
    emailAddress: string;
    contactNumber: string;
    company: Company;
}
