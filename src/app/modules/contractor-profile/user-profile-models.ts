

// interfaces
export interface WorkHistory {
    role: string;
    company: string;
    from: string;
    to: string;
    current: string;
}
export interface CurrentWork {
    role: string;
    company: string;
    from: string;
    current: string;
}
export interface References {
    fullName: string;
    contactNumber: string;
    emailAddress: string;
}
export interface Skills {
    description: string;
    level: string;
}
export interface Certifications {
    name: string;
    authority: string;
    attained: string;
}
export interface Qualifications {
    name: string;
    institution: string;
    attained: string;
}
export interface Races {
    description: string;
}
export interface Titles {
    description: string;
}
export interface Provinces {
    description: string;
}
export interface Cities {
    province: string;
    description: string;
}

export interface Profile {
    name: string;
    surname: string;
    candidateNum: string;
    nationality?: string;
    race?: string;
    title?: string;
    gender?: string;
    city?: string;
    province?: string;
    preferredJobLocation?: string;
    contactNumber: string;
    email: string;
    idNumber: string;
    ratePerHour: number;
    noticePeriod?: any;
    placed: boolean;
    workHistory?: any;
    references?: any;
    skills?: any;
    certifications?: any;
    qualifications?: any;
    percentageScore: number;
    initials: string;
}


export interface ChangePasswordRequest{
    currentPassword: string;
    newPassword: string;
}