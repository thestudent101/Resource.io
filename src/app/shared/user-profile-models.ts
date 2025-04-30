

export interface ImageUpload {
    fileName: string,
    contentType: string,
    imageFile: string,
}

export interface ImageResponse {
    image: string,
    name: string,
    type: string
}

export interface Reference {
    fullName: string;
    contactNumber: string;
    emailAddress: string;
}

export interface Skill {
    description: string;
    level: string;
}

export interface Certification {
    name: string;
    authority: string;
    attained: number;
}

export interface Qualification {
    name: string;
    institution: string;
    attained: number;
}

export interface WorkHistory {
    name: string;
    company: string;
    from: number;
    to: number;
    current: boolean;
}

export interface UserProfile {
    candidateNum: string;
    nationality: string;
    race: string;
    title: string;
    gender: string;
    city: string;
    province: string;
    preferredJobLocation: string;
    contactNumber?: any;
    email: string;
    ratePerHour: number;
    noticePeriod: string;
    placed: boolean;
    workHistory: WorkHistory[];
    references: Reference[];
    skills: Skill[];
    certifications: Certification[];
    qualifications: Qualification[];
    percentageScore: number;
}

export interface ContractorProfile {
    name: string;
    surname: string;
    candidateNum: string;
    nationality: string;
    race: string;
    title: string;
    gender: string;
    city: string;
    province: string;
    preferredJobLocation: string;
    contactNumber: string;
    email: string;
    idNumber: string;
    ratePerHour: number;
    noticePeriod: string;
    placed: boolean;
    workHistory: WorkHistory[];
    references: Reference[];
    skills: Skill[];
    certifications: Certification[];
    qualifications: Qualification[];
    percentageScore: number;
    rawScore: number;
    initials: string;
}


export interface SuccessResponse {
    status: string;
    message: string;
}