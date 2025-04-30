import { Component, Input } from '@angular/core';
import { Filters, PublicContractorSummary } from '../dashboard-models';
import { DashboardService } from '../dashboard.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription, map, startWith } from 'rxjs';

@Component({
  selector: 'app-consultantsearch',
  templateUrl: './consultantsearch.component.html',
  styleUrls: ['./consultantsearch.component.css']
})


export class ConsultantsearchComponent { 
  filters: Filters = {
    skills: [],
    certifications: [],
    experience: [],
    qualifications: []
  };
  filteredSkills!: Observable<string[]>;
  filteredExperience!: Observable<string[]>;
  filteredQualifications!: Observable<string[]>;
  filteredCertifications!: Observable<string[]>;
  qualificationsFilter = new FormControl();
  certificationFilter = new FormControl();
  skillsFilter = new FormControl(); 
  experienceFilter = new FormControl();

  private dashboardSubscription!: Subscription;
  private filtersSubscription!: Subscription;

  contractors: PublicContractorSummary[] = [];
  loading = false;
  /* input value*/
  @Input() filterExperience: string = "";



  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    
    this.loadFilters();
    if (!this.filterExperience) this.fetchData();
  
  }
    ngOnDestroy(){
      if (this.dashboardSubscription) this.dashboardSubscription.unsubscribe();
      if (this.filtersSubscription) this.filtersSubscription.unsubscribe();
  }
    loadFilters(){
      this.loading = true; 
      this.filtersSubscription = this.dashboardService.getFilterCategories().subscribe(filters => {
        
          this.mergeFilters(filters)
      }, error => {
      });
  }


  onClick(event:any, value:string) {
    if(event.target.checked) {
      const key = event.target.value;
      switch (value) {
        case "experience":
          this.experienceFilter.setValue(key)
          break;
        case "skill":
          this.skillsFilter.setValue(key)
          break;
        case "qualification":
          this.qualificationsFilter.setValue(key)
          break;
        case "certification":
          this.certificationFilter.setValue(key)
          break;
        default:
          break;
      }      
      this.filterData();
    }
  }



  fetchData(skillsFilter: string = 'ALL', qualificationsFilter: string = 'ALL', certificationsFilter: string = 'ALL', experienceFilter: string = 'ALL', page: number = 0, size: number = 10) {
    this.loading = true;
    this.contractors = [];
    this.dashboardSubscription = this.dashboardService.getContractors(skillsFilter,qualificationsFilter,certificationsFilter,experienceFilter, page, size).subscribe(contractors => {
        this.contractors = contractors.content;
        this.loading = false;
    }, error => {
        console.log(error);
        this.loading = false;
    });
}

filterData(){
  this.fetchData(this.skillsFilter.value !== null ? this.skillsFilter.value : 'ALL', 
  this.qualificationsFilter.value !== null ? this.qualificationsFilter.value : 'ALL', 
  this.certificationFilter.value !== null ? this.certificationFilter.value : 'ALL', 
  this.experienceFilter.value !== null ? this.experienceFilter.value : 'ALL', 0, 10);
}

get isAuthenticated(): boolean {
  return this.dashboardService.isAuthenticated();
}

mergeFilters(filters: Filters){
  
  this.filters?.skills.push(...filters?.skills);
  this.filters?.certifications.push(...filters?.certifications);
  this.filters?.qualifications.push(...filters?.qualifications);
  this.filters?.experience.push(...filters?.experience);
}


private setupAutocompleteFilters(){
  this.filteredCertifications = this.certificationFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCollection(this.filters.certifications, value))
  );
  this.filteredQualifications = this.qualificationsFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCollection(this.filters.qualifications, value))
  );
  this.filteredSkills = this.skillsFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCollection(this.filters.skills, value))
  );
  this.filteredExperience = this.experienceFilter.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCollection(this.filters.experience, value))
  );
}


private filterCollection(collection: string[], query: string): string[]{
  const filterValue = query.toLowerCase();
  if (filterValue === 'all') return collection;
  return collection.filter(option => option.toLowerCase().includes(filterValue));

}
}
