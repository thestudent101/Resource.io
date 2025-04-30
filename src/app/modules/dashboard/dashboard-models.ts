export interface PublicCompany{
    id: string;
    name: string;
    sanitisedName: string;
    sanitizedName: string;
    totalJobProfiles: number;
}

export interface PublicJobProfileSummary {
    id: string;
    jobLocation: string;
    companyName: string;
    closingDate: string;
    ratePerHour: number;
    contractDurationInMonths: number;
}

export interface Sort {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PublicJobProfiles {
    content: PublicJobProfileSummary[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
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

export interface Certification {
    description: string;
}

export interface PublicJobProfile {
    identifier(identifier: any, email: any): unknown;
    id: string;
    title: string;
    description: string;
    closingDate: string;
    ratePerHour: number;
    qualifications: Qualification[];
    responsibilities: Responsibility[];
    skills: Skill[];
    certifications: Certification[];
    contractDurationInMonths: number;
}

export interface PublicContractorSummary {
    candidateNumber: string;
    summary: string;
    availability: string;
    emailAddress: string;
    initials: string;
}

export interface PublicContractors {
    content: PublicContractorSummary[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface PublicContractor {
    candidateNumber: string;
    gender: string;
    location: string;
    availability: string;
    certifications: Certification[];
    qualifications: Qualification[];
    skills: Skill[];
}

export interface ApiStatistics {
    totalNumberOfCompanies: number;
    totalNumberOfContractors: number;
    totalNumberOfJobProfiles: number;
    totalYearsOfExperience: number;
    totalNumberOfUniqueSkills: number;
    totalNumberOfSeniorContractors: number;
    skillsCount: KeyValueSummary[];
    totalNumberOfIntermediateContractors: number;
    averageRateOfSeniorContractors: number;
    totalNumberOfJuniorContractors: number;
    averageRateOfIntermediateContractors: number;
    averageRateOfJuniorContractors: number;
}

export interface Statistics {
    totalClients: number;
    totalCompanies: number;
    totalContractors: number;
    totalJobProfiles: number;
    totalYearsOfExperience: number;
    totalUniqueContractorSkills: number;
    totalOfflineContractors: number;
    totalHoursSold: number;
    summarySeniorContractors: RateSummary;
    summaryIntermediateContractors: RateSummary;
    summaryJuniorContractors: RateSummary;
    topSkills: KeyValueSummary[];
}

export interface KeyValueSummary {
    name: string,
    count: number;
}

export interface RateSummary {
    total: number;
    ratePerHour: number;
}

export interface Filters {
    skills: string[];
    qualifications: string[];
    certifications: string[];
    experience: string[];
}