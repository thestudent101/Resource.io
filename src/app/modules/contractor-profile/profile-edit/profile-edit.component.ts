import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder,Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { SovernService } from '../sovern.service';
import { RegistrationStatusEnum } from '../../onboarding-wizard/user-profile-models';
import { DataService } from 'src/app/shared/data.service';
import { SessionService } from 'src/app/shared/session.service';
import { ContractorProfileRepositoryService } from '../contractor-profile-repository.service';
import { UserProfileData } from '../user-profile-data';
import { ProfilePictureComponent } from 'src/app/shared/profile-picture/profile-picture.component';
import { SessionStorageService } from 'src/app/shared/session-storage.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  [x: string]: any;
  resumeExtracted: boolean = false;
  isLoading: boolean = false;
  errorText = '';
  createProfile!:boolean;
  userData:any = null;
  username = '';
  imageUploading = false;
  races = UserProfileData.races()
  titles = UserProfileData.titles();
  provinces = UserProfileData.provinces();
  cities = UserProfileData.cities();
  noticePeriods = UserProfileData.noticePeriods();
  genders = UserProfileData.genders();
  levels = UserProfileData.levels();
  nationalities = UserProfileData.nationalities();
  resumeData!: FormGroup;
  resumeData2: any = {  // Initialize resumeData object with default values
    ContactInformation: {
      CandidateName: {
      FormattedName: '',
      GivenName: '',
      FamilyName: ''
    },
   Telephones:[],
      EmailAddresses: [],
      idNumber: '',
      ratePerHour: ''
    },
    skills: [],
    EmploymentHistory: [],
    Education: {
      EducationDetails: []
    },
    Certifications: [],
    references: []
  };

  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.SouthAfrica, CountryISO.Lesotho];
  

  @ViewChild('profilePicInput', { static: false }) profilePicInput!: ElementRef<HTMLInputElement>;
  @ViewChild(ProfilePictureComponent, { static: false }) profilePictureView!: ProfilePictureComponent;

  @ViewChild('skillName', { static: false }) inputSkill!: ElementRef<HTMLInputElement>;
  selectedSkill: object = {};

  @ViewChild('qualName',{static :false}) inputQualification!:ElementRef<HTMLInputElement>;
  @ViewChild('institution',{static :false}) inputQInstitution!:ElementRef<HTMLInputElement>;
  @ViewChild('attained',{static :false}) inputAtteined!:ElementRef<HTMLInputElement>;
   selectedQualification:object={};

  @ViewChild('certName',{static :false}) inputCertName!:ElementRef<HTMLInputElement>;
  @ViewChild('certAuthority',{static :false}) inputCertAuthority!:ElementRef<HTMLInputElement>;
  @ViewChild('certAttained',{static :false}) inputCertAttained!:ElementRef<HTMLInputElement>;
   selectedCertification:object={};

  @ViewChild('role',{static :false}) inputRole!:ElementRef<HTMLInputElement>;
  @ViewChild('company',{static :false}) inputCompany!:ElementRef<HTMLInputElement>;
  @ViewChild('from',{static :false}) inputFrom!:ElementRef<HTMLInputElement>;
  @ViewChild('to',{static :false}) inputTo!:ElementRef<HTMLInputElement>;
  selectedWorkHistory:object={};
  nullValues:any = {
    qualification: false,
    certification: false,
    workHistory: false
  }
  idPassportPatterns:RegExp[] =[
    /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/,
    /^[A-Z0-9]{6,9}$/
  ];
  // profilePicInput: any;
  selectedFile: any;

  ngOnInit(): void {
    this.username = this.sessionService.getUsername();
      this.resumeData = new FormGroup({
        name: new FormControl("",[Validators.required]),
        surname: new FormControl("",[Validators.required]),
        title: new FormControl("",[Validators.required]),
        jobTitle: new FormControl("",[Validators.required]),
        province: new FormControl(""),
        city: new FormControl(""),
        contactNumber: new FormControl("",[Validators.required]),
        email: new FormControl(this.username,[Validators.required,Validators.email]),
        preferredJobLocation: new FormControl("",[Validators.required]),
        ratePerHour: new FormControl("", [Validators.required]),
        idNumber: new FormControl("", [Validators.required, this.multiPatternValidator(this.idPassportPatterns)]),
        race: new FormControl("", [Validators.required]),
        nationality: new FormControl("", [Validators.required]),
        gender: new FormControl("", [Validators.required]),
        noticePeriod: new FormControl("", [Validators.required]),
        skills: new FormControl([], [Validators.required]),
        qualifications: new FormControl([], [Validators.required]),
        certifications: new FormControl([]),
        workHistory: new FormControl([],  [Validators.required])
      })
      this.loadProfile();            
  }

  clearForm() {
    this.resumeData.patchValue({
      jobTitle: "",
      name: "",
      surname: "",
      skills: [],
      qualifications: [],
      certifications: [],
      workHistory: []
    })
}
 
  multiPatternValidator(patterns: RegExp[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(!control.value) {
        return null
      }
      const validPattern = patterns.some((pattern) => pattern.test(control.value));
      return validPattern ? null : {invalidPattern: true};
    }
  }

  constructor(private sessionStorage: SessionStorageService, private sovernService: SovernService,private contractorProfileRepository: ContractorProfileRepositoryService, private dataService: DataService, private sessionService: SessionService, private snackBar: MatSnackBar, private router: Router) {}
  
  convertDate(date: string): string {
    return new Date(date).toISOString();
  }

  private loadProfile() {
    this.isLoading = true;

    this.contractorProfileRepository.loadProfile(this.username).subscribe(response => {
        this.userData = response;
        if (this.userData == null) {
            this.createProfile = true;
        } else {
            this.resumeData.patchValue(response)
            this.sessionService.setUserProfile(this.userData);
            this.createProfile = false;
            this.isLoading = false;
        }
        this.snackBar.open('Loaded successfully', '', {
            duration: 3000,
        });
    }, error => {
      this.isLoading = false;

        if (error.status == 404) {
            this.createProfile = true;
            this.userData = null;
        } else {
            this.errorText = error.error.message
        }
    })
}

  hasNullValues(obj: any, controlName: string): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === '')) {
        this.nullValues[controlName] = true;        
        this.resumeData.get(controlName)?.setErrors({hasnull: true})
        return true
      }
    }    
    return false;
  }
  

  uploadResume(fileInput: HTMLInputElement): void {
    this.isLoading = true;
    const file = fileInput.files?.[0];    
    if (file) {
      this.sovernService.uploadResume(file).subscribe((res:any) => {
        this.resumeData2 = res;
        this.resumeExtracted = true
        this.updateForm();
        this.isLoading = false;

      }, (err:any) => {
        this.isLoading = false;
      }
      )
    }
  }

  // removeSkill(skill: any) {
  //   const skills:any[] = this.resumeData.value.skills;
  //   const index = skills.indexOf(skill.name);

  //   if (index > -1) {
  //     skills.splice(index, 1);
  //     this.selectedSkill = "";
  //     this.inputSkill.nativeElement.value = ""
  //     this.resumeData.patchValue({
  //       skills: skills
  //     })
  //   }
  // }
  get userEmailAddress(): string {
    return this.sessionStorage.getItem('user-name');
}

get fileUploadDisabled(): boolean {
  return this.selectedFile == null;
}

get fileUploadedError(): boolean {  
  return  this.selectedFile?.size > (5 * 1000 * 1000);
}

  removeSkill(skill: any) {
    const skills:any[] = this.resumeData.value.skills;
    const removed = skills.filter((item:any) => item.description.toLowerCase() !== skill.description.toLowerCase());

    this.selectedSkill = {};
    this.inputSkill.nativeElement.value = ""

    this.resumeData.patchValue({
      skills: removed
    })
  }
  removeQualification(qualification: any) {
    const qualifications:any[] = this.resumeData.value.qualifications;
    const removed = qualifications.filter((item:any) => item.name.toLowerCase() !== qualification.name.toLowerCase());

    this.selectedQualification = {};
    this.inputQualification.nativeElement.value = ""
    this.inputQInstitution.nativeElement.value = ""
    this.inputAtteined.nativeElement.value = ""
    this.resumeData.patchValue({
      qualifications: removed
    })
  }

  removeCert(cert: any) {
    const certifications:any[] = this.resumeData.value.certifications;
    const removed = certifications.filter((item:any) => item.name.toLowerCase() !== cert.name.toLowerCase());

    this.selectedQualification = {};
    this.inputCertName.nativeElement.value = ""
    this.inputCertAuthority.nativeElement.value = ""
    this.inputCertAttained.nativeElement.value = ""
    this.resumeData.patchValue({
      certifications: removed
    })
  }

  removeWork(work: any) {
    const workHistory:any[] = this.resumeData.value.workHistory;
    const removed = workHistory.filter((item:any) => item.role.toLowerCase() !== work.role.toLowerCase());

    this.selectedWorkHistory = {};
    this.inputRole.nativeElement.value = ""
    this.inputCompany.nativeElement.value = ""
    this.inputFrom.nativeElement.value = ""
    this.inputTo.nativeElement.value = ""
    this.resumeData.patchValue({
      workHistory: removed
    })
  }

  // Functionality to remove duplicated data

  
  updateForm() {
    const lsSKills:any[] = this.resumeData.value.skills;
    const lsqualifications:any[] = this.resumeData.value.qualifications;
    const lscertifications:any[] = this.resumeData.value.certifications;
    const lsworkHistory:any[] = this.resumeData.value.workHistory;

    if(lsSKills !== null && lsSKills.length > 0) {

      lsSKills.push(...this.assignExtractedData().skills)
    } else {
      this.resumeData.patchValue({
        skills: [...this.assignExtractedData().skills]
      })
    }
    if(lsqualifications !== null && lsqualifications.length > 0) {
      lsqualifications.push(...this.assignExtractedData().qualification)
    } else {
      this.resumeData.patchValue({
        qualifications: [...this.assignExtractedData().qualification]
      })
    }
    if(lscertifications !== null && lscertifications.length > 0) {
      lscertifications.push(...this.assignExtractedData().certifications)
    } else {
      this.resumeData.patchValue({
        certifications: [...this.assignExtractedData().certifications]
      })
    }
    if(lsworkHistory !== null && lsworkHistory.length > 0) {
      lsworkHistory.push(...this.assignExtractedData().workhistory)
      this.getRecentJobTitle()
    } else {
      this.resumeData.patchValue({
        workHistory: [...this.assignExtractedData().workhistory]
      })
    }
  }
  
  
  setSkillToForm(skill: any) {
    this.selectedSkill = skill;
    this.inputSkill.nativeElement.value = skill.description    
  }

  
  setQualificationToForm(qualification: any, institution: any, attained:any) {
    if(attained !== "") {
      attained = this.convertDate(attained).slice(0, 10);
    }
    this.selectedQualification = {
      name: qualification,
      institution,
      attained
    };

    this.inputQualification.nativeElement.value = qualification;
    this.inputAtteined.nativeElement.value = attained;
    this.inputQInstitution.nativeElement.value = institution     
  }
  setCertToForm(cert:any) {
    if(cert.attained !== "") {
      cert.attained = this.convertDate(cert.attained).slice(0, 10);
    }

    this.selectedQualification = {
      name:cert.name,
      authority:cert.authority,
      attained:cert.attained
    };

    this.inputCertName.nativeElement.value = cert.name;
    this.inputCertAuthority.nativeElement.value = cert.authority;
    this.inputCertAttained.nativeElement.value = cert.attained;     
  }

  setWorkHistory(work:any) {
    if(work.from !== "") {
      work.from = this.convertDate(work.from).slice(0, 10);;
    }

    if(work.to !== '') {
      work.to = this.convertDate(work.to).slice(0, 10);;
    }

    this.selectedWorkHistory = work

    this.inputRole.nativeElement.value = work.role;
    this.inputCompany.nativeElement.value = work.company;
    this.inputFrom.nativeElement.value = work.from     
    this.inputTo.nativeElement.value = work.to     
  }



  addSkills(name: HTMLInputElement) {
    let index: number = 0;
    
    const obj: any = {
      description: name.value,
    }

    let skills:any[] = this.resumeData.value.skills;

    if(skills === null) {
      index = -1;
      skills=[];
      this.resumeData.patchValue({skills: []});

    } else {
      index = skills.findIndex(item => item.description.toLowerCase() === obj.description.toLowerCase())
    }

    if(index !== -1) {
      const currQual = skills[index];
      const isModified = Object.keys(obj).some(key => obj[key] !== currQual[key]);
      if(isModified) {
        skills[index] = {...currQual, ...obj}
        this.resumeData.patchValue({
          skills: skills
        })
        this.selectedSkill ={}
        this.inputSkill.nativeElement.value = ""
      }
    } else {
      
      skills.push(obj)
      this.resumeData.patchValue({
        skills: skills
      })
      this.inputSkill.nativeElement.value = ""
    }

  }
  addQualification(qualName: HTMLInputElement,institution: HTMLInputElement,attained: HTMLInputElement) {
    let index: number = 0;
    
    const obj: any = {
      name: qualName.value,
      institution: institution.value,
      attained: this.convertDate(attained.value)
    }

    let Qualifications:any[] = this.resumeData.value.qualifications;

    if(Qualifications === null) {
      index = -1;
      Qualifications=[];
      this.resumeData.patchValue({qualifications: []});

    } else {
      index = Qualifications.findIndex(item => item.name.toLowerCase() === obj.name.toLowerCase())
    }

    if(index !== -1) {
      const currQual = Qualifications[index];
      const isModified = Object.keys(obj).some(key => obj[key] !== currQual[key]);
      if(isModified) {
        Qualifications[index] = {...currQual, ...obj}
        this.resumeData.patchValue({
          qualifications: Qualifications
        })
        this.selectedQualification ={}
        this.inputQualification.nativeElement.value = ""
        this.inputQInstitution.nativeElement.value = ""
        this.inputAtteined.nativeElement.value = ""

      }
    } else {
      
      Qualifications.push(obj)
      this.resumeData.patchValue({
        qualifications: Qualifications
      })
      this.inputQualification.nativeElement.value = ""
      this.inputQInstitution.nativeElement.value = ""
      this.inputAtteined.nativeElement.value = ""
    }

  }

  addCertification(certName: HTMLInputElement,certAuthority: HTMLInputElement,certAttained: HTMLInputElement) {
    let index: number = 0;

    const obj: any = {
      name: certName.value,
      authority: certAuthority.value,
      attained: this.convertDate(certAttained.value)
    }
    let certification:any[] = this.resumeData.value.certifications;
    if(certification === null) {
      index = -1;
      certification =[];
      this.resumeData.patchValue({certifications: []});
    } else{ 
    index = certification.findIndex(item => item.name.toLowerCase() === obj.name.toLowerCase())
}
    if(index !== -1) {
      const currCert = certification[index];
      const isModified = Object.keys(obj).some(key => obj[key] !== currCert[key]);
      if(isModified) {
        certification[index] = {...currCert, ...obj}
        this.resumeData.patchValue({
          certifications: certification
        })
        this.selectedCertification = {};
        this.inputCertName.nativeElement.value = ""
        this.inputCertAuthority.nativeElement.value = ""
        this.inputCertAttained.nativeElement.value = ""

      }
    } else {
      certification.push(obj)
      this.resumeData.patchValue({
        certifications: certification
      })
      this.inputCertName.nativeElement.value = ""
      this.inputCertAuthority.nativeElement.value = ""
      this.inputCertAttained.nativeElement.value = ""
    }

  }
  addWorkHistory(role: HTMLInputElement,company: HTMLInputElement,from: HTMLInputElement, to: HTMLInputElement) {
    let index: number = 0;
    const obj: any = {
      role: role.value,
      company: company.value,
      from: this.convertDate(from.value),
      to: to.value != '' ? this.convertDate(to.value): '',
      current: to.value == '' ? 'false' :'true'
    }
    let workHistory:any[] = this.resumeData.value.workHistory;
    if(workHistory === null) {
      index = -1
      workHistory = []
      this.resumeData.patchValue({workHistory: []});

    } else {
      index = workHistory.findIndex(item => item.role.toLowerCase() === obj.role.toLowerCase())
    }


    if(index !== -1) {
      const currWork = workHistory[index];
      const isModified = Object.keys(obj).some(key => obj[key] !== currWork[key]);
      if(isModified) {
        workHistory[index] = {...currWork, ...obj}
        this.resumeData.patchValue({
          workHistory: workHistory
        })
        this.selectedWorkHistory = {};
        this.inputRole.nativeElement.value = ""
        this.inputCompany.nativeElement.value = ""
        this.inputFrom.nativeElement.value = ""
        this.inputTo.nativeElement.value = ""

      }
    } else {
      workHistory.push(obj)
      this.resumeData.patchValue({
        workHistory: workHistory
      })
      this.inputRole.nativeElement.value = ""
      this.inputCompany.nativeElement.value = ""
      this.inputFrom.nativeElement.value = ""
      this.inputTo.nativeElement.value = ""
    }

  }
  getRecentJobTitle() {
    const workHistory = this.resumeData.value.workHistory;
  workHistory.sort((a: any, b: any) => new Date(b.from).getTime() - new Date(a.from).getTime());
    const mostRecentJobTitle = workHistory[0].role;
  
    this.resumeData.patchValue({
      jobTitle: mostRecentJobTitle
    })
  }
  assignExtractedData() {
    const skills: any[] = this.resumeData2?.Skills?.Raw?.length > 0 ? this.resumeData2?.Skills?.Raw : [];
    const tempSkills :any[] =[];

    const positions: any[] = this.resumeData2?.EmploymentHistory?.Positions?.length > 0 ? this.resumeData2?.EmploymentHistory?.Positions : [];
    const tempWorkHistory: any[] = [];

    const certifications: any[] = this.resumeData2?.Certifications?.length > 0 ? this.resumeData2?.Certifications : [];
    const tempCert: any[] = [];

    const qualifications: any[] = this.resumeData2?.Education?.EducationDetails?.length > 0 ? this.resumeData2?.Education?.EducationDetails : [];
    const tempQual: any[] = [];

    if(qualifications.length > 0) {
      qualifications.forEach((res:any) => {
        tempQual.push({
          name: res?.Degree?.Name?.Raw || "",
          institution: res?.SchoolName?.Raw || "",
          attained: this.convertDate(res?.LastEducationDate?.Date) || ""
        })
      })
    }

    if(certifications.length > 0) {
      certifications.forEach((res:any) => {
        tempCert.push({
          name: res?.Name,
          authority: "",
          attained: ""
        })
      })
    }

    if(positions.length > 0) {
      positions.forEach((res:any) => {
        if(res.JobTitle === null || res.JobTitle === undefined) return;
        tempWorkHistory.push({
            role: res?.JobTitle?.Raw,
            company: res?.Employer?.Name?.Raw,
            from: this.convertDate(res?.StartDate?.Date),
            to: this.convertDate(res?.EndDate?.Date),
        })
    })
    }
    
    if(skills.length > 0) {
      skills.forEach((res:any) => {        
        tempSkills.push({description: res?.Name})
      }) 
    }
    

    return {
      firstname: this.resumeData2?.ContactInformation?.CandidateName?.GivenName || "",
      lastname: this.resumeData2?.ContactInformation?.CandidateName?.FamilyName || "",
      contactNumber: this.resumeData2?.ContactInformation?.Telephones?.length > 0 ? this.resumeData2?.ContactInformation?.Telephones[0]?.Raw : "",
      // emailAddress: this.resumeData2?.ContactInformation?.EmailAddresses?.length > 0 ? this.resumeData2?.ContactInformation?.EmailAddresses[0] : "",
      skills: tempSkills,
      qualification:tempQual,
      certifications: tempCert,
      workhistory : tempWorkHistory
    }


  }

  
  update(){

    if(this.resumeData.valid) {
      this.isLoading = true;
      this.resumeData.patchValue({contactNumber: this.resumeData.value.contactNumber?.internationalNumber})
      if(this.createProfile) {
        this.createUserProfile(this.resumeData.value)
      } else {
        this.updateUserProfile(this.resumeData.value)
      }
     
    } else {
      this.snackBar.open("Please update or add all required fields","", {
        duration: 5000,
      });
    }

  }
  changeProfilePicture(){

    this.profilePicInput.nativeElement.click();
}

onFileChanged(event: any) {
    //Select File

    this.selectedFile = event.target.files[0];      
    if (!this.fileUploadedError) {
        this.onUpload();
    }
}
  get userInitials(): string {
        let profile =  this.sessionStorage.getItem('user-profile');
        if (profile == null || profile.name == null || profile.surname == null) return "BP";
        return profile.name.slice(0,1) + profile.surname.slice(0,1);
    }
onUpload() {
    if (this.selectedFile == null || this.selectedFile == undefined) return;
    this.imageUploading = true;
    this.isLoading = true;
    this.sessionService.uploadProfilePicture(this.sessionService.getUsername(), this.selectedFile)
    .then((response: { message: string; }) => {
        this.profilePictureView.reloadImage();
        this.selectedFile = null;
        this.profilePicInput.nativeElement.value = "";
        this.imageUploading = false;
        this.isLoading = false;

        this.snackBar.open(response.message, '', {
            duration: 7000,
        });
    })
    .catch((error: { error: { message: any; }; }) => {
        this.selectedFile = null;
        this.imageUploading = false;
        this.errorText= error.error.message;
        this.isLoading = false;

    });        
}

  private createUserProfile(postData:any) {
    this.contractorProfileRepository.createContractorProfile(postData)
    .subscribe(() => {
        this.updateUserStatus(this.sessionService.getUsername(), RegistrationStatusEnum.COMPLETE);
        this.snackBar.open('created successfully', '', {
            duration: 3000,
        });
        this.router.navigateByUrl('/main/user-profile/view');
        this.isLoading = false;

    }, error => {
      this.isLoading = false;
        this.errorText = error.message;
    })
}


private updateUserProfile(postData:any) {
  this.contractorProfileRepository.updateContractorProfile(postData)
  .subscribe(() => {
      this.snackBar.open('updated successfully', '', {
          duration: 3000,
      });
      this.router.navigateByUrl('/main/user-profile/view');
      this.isLoading = false;

  }, error => {
    this.isLoading = false;    
      this.errorText = error.message;
  })
}

private updateUserStatus(emailAddress: string, status: RegistrationStatusEnum){
  let userProfile = {
      status: status
  }
  this.contractorProfileRepository.updateUserProfile(userProfile, emailAddress)
      .subscribe((result) => {
          console.log(result)
      }, (error) => {
          this.errorText = error.error.message;
      });
}
}
