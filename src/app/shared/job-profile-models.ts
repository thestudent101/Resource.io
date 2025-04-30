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

export interface Profiles {
contractDurationInMonths: any;
    identifier: string;
    title: string;
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
    closingDate: any;
    company_logo: string;
}