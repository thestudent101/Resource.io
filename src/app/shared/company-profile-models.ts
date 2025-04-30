export interface Certification {
    description: string;
}

export interface Offer {
    description: string;
}

export interface PersonalityTrait {
    description: string;
}

export interface Qualification {
    description: string;
}

export interface Responsibility {
    description: string;
}

export interface Skill {
    description: string;
}

export interface Id {
    timestamp: number;
    counter: number;
    date: any;
    time: any;
    machineIdentifier: number;
    processIdentifier: number;
    timeSecond: number;
}

export interface Company {
    id: Id;
    name: string;
    registrationNumber: string;
}

export interface CompanyJobProfile {
    isJobSaved: boolean;
    id?: any;
    title: string;
    identifier: string;
    description: string;
    workExperienceInYears: number;
    jobLocation: string;
    ratePerHour: number;
    createdBy: string;
    employmentEquity: string;
    certifications: Certification[];
    offers: Offer[];
    personalityTraits: PersonalityTrait[];
    qualifications: Qualification[];
    responsibilities: Responsibility[];
    skills: Skill[];
    company: Company;
    dateLogged: any;
    closingDate: any;
    score: number;
    contractDurationInMonths: number;
    company_logo: string;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
}

export interface PaginatedJobOffers {
    content: CompanyJobProfile[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface ClientMatchRequest {
    identifier: string;
    clientEmail: string;
    candidateNum: string;
}