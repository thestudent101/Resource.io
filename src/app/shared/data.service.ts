
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../app.provider';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(BASE_URL) protected baseUrl: string, private http: HttpClient) { }

    qualificationsUrl = this.baseUrl + '/profile/qualifications';
    certificationsUrl = this.baseUrl + '/profile/certifications';
    skillsUrl = this.baseUrl + '/profile/skills';
    institutionsUrl = this.baseUrl + '/profile/institutions';


    qualifications: any;
    certifications: any;
    institutions: any;
    skills: any;
    clientValidation: any;
    contractorValidation: any;

    setData() {
        this.setQualifications();
        this.setCertifications();
        this.setSkills();
        this.setInstitutions();
    }

    setQualifications() {
        this.http.get(this.qualificationsUrl).subscribe(response => {
            this.qualifications = response;
        }, error => {
            console.log(error);
        });       
    }

    setInstitutions() {
        this.http.get(this.institutionsUrl).subscribe(response => {
            this.institutions = response;
        }, error => {
            console.log(error);
        });
    }

    setCertifications() {
        this.http.get(this.certificationsUrl).subscribe(response => {
            this.certifications = response;
        }, error => {
            console.log(error);
        });
    }

    setSkills() {
        this.http.get(this.skillsUrl).subscribe(response => {
            this.skills = response;
        }, error => {
            console.log(error);
        });
    }

    setUserType() {

    }

    getQualifications() {
        return this.qualifications || [];
    }

    getCertificates() {
        return this.certifications || [];
    }

    getInstitutions() {
        return this.institutions || [];
    }

    getSkills() {
        return this.skills || [];
    }

    getClientValidation() {
        return this.clientValidation;
    }

    getContractorValidation() {
        return this.contractorValidation;
    }
}
