import { Component, OnInit, OnDestroy } from '@angular/core';
import { WizardService } from '../../wizard.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { WorkHistory, Skills } from 'src/app/modules/contractor-profile/user-profile-models';

@Component({
    selector: 'contractor-details-step',
    templateUrl: './contractor-details.component.html',
    styleUrls: ['./contractor-details.component.css']
})
export class ContractorDetailsComponent implements OnInit, OnDestroy {

    private errorSubscription!: Subscription;
    loading: boolean = false;
    errorMessage: string = '';
    levels!: any[];
    skillsList!: string[];
    filteredSkills!: Observable<string[]>;
    selectable = true;
    removable = true;
    skillDescription:any = new FormControl('');
    skillLevel:any = new FormControl('');
    workRole:any = new FormControl('');
    workCompany:any = new FormControl('');
    workFrom:any = new FormControl('');
    workTo:any = new FormControl('');
    workHistory: WorkHistory[] = [];
    skills: Skills[] = [];
    ratePerHour:any = new FormControl('');

    step = 1;

    constructor(private wizardService: WizardService) { }

    ngOnInit(): void {
        this.errorSubscription = this.wizardService.errorEvent$.subscribe((errorMessage) => {
            this.errorMessage = errorMessage;
            this.loading = false;
        });
        this.levels = this.wizardService.getLevels();
        this.skillsList = this.wizardService.getSkills();
        this.setupSkillsFilter();
        this.errorMessage = "";
    } 

    ngOnDestroy(){
        this.loading = false;
        if (this.errorSubscription) this.errorSubscription.unsubscribe();
    }
    addSkill() {
        if (this.skillDescription.value != '' && this.skillLevel.value != '') {
            this.skills = this.skills || [];
            this.skills.push({ description: this.skillDescription.value.trim(), level: this.skillLevel.value });
            this.skillDescription.setValue('');
            this.skillLevel.setValue('');
        }
    }

    removeSkill(skill: Skills): void {
        const index = this.skills.indexOf(skill);
        if (index >= 0) {
            this.skills.splice(index, 1);
        }
    }

    addWorkHistory() {
        if (this.workRole.value != '' && this.workCompany.value != '' || this.workFrom.value != '') {
            let workCurrent = (this.workTo.value == '') ? 'true' : 'false';
            this.workHistory = this.workHistory || [];
            this.workHistory.push({ role: this.workRole.value.trim(), company: this.workCompany.value, from: this.workFrom.value, to: this.workTo.value, current: workCurrent });
            this.workRole.setValue('');
            this.workCompany.setValue('');
            this.workFrom.setValue('');
            this.workTo.setValue('');
        }
    }

    removeWorkHistory(work: WorkHistory): void {
        const index = this.workHistory.indexOf(work);
        if (index >= 0) {
            this.workHistory.splice(index, 1);
        }
    }

    skip() {
        this.wizardService.skip();
    }


    next() {
        if (this.formInvalid){
            if (this.skillDescription.value !== '' || this.skillLevel.value !== '' || this.workRole.value !== '' || this.workFrom.value !== '' || this.workCompany.value !== '') {
                this.addSkill();
                this.addWorkHistory();

                this.loading = true;
                let consultantProfile = {
                    skills: this.skills,
                    workHistory: this.workHistory,
                    ratePerHour: this.ratePerHour.value
                }
                this.wizardService.setContractorProfile(consultantProfile);
                this.wizardService.createContractorProfile();

                return;
            }
            this.errorMessage = "Please complete the required details or press skip"
            return;
        }
        this.loading = true;
        let consultantProfile = {
            skills: this.skills,
            workHistory: this.workHistory,
            ratePerHour: this.ratePerHour.value
        }
        this.wizardService.setContractorProfile(consultantProfile);
        this.wizardService.createContractorProfile();
    }
    

    get hasErrors(): boolean {
        return this.errorMessage.length > 0;
    }

    get formInvalid(): boolean {
        return this.ratePerHour.value.length == 0 || this.skills.length == 0 || this.workHistory.length == 0;
    }

    private setupSkillsFilter(){
        this.filteredSkills = this.skillDescription.valueChanges.pipe(
            startWith(null),
            map((skill: string | null) => skill ? this.filterSkills(skill) : this.skillsList.slice()));
    }

    private filterSkills(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.skillsList.filter(skill =>
            skill.toLowerCase().includes(filterValue)
        );
    }

    prevStep(): void {
        if (this.step !== 1) {
            this.step--;
        }
        console.log(this.step);
        
    }

    nextStep(): void {
        this.step++;
        console.log(this.step);
    }

}
