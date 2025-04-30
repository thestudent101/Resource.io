import { Component, OnInit, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Filters, PublicContractorSummary } from '../dashboard-models';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {

    private dashboardSubscription!: Subscription;
    private filtersSubscription!: Subscription;
    contractors: PublicContractorSummary[] = [];
    loading = false;
    totalElements!: number;
    pageSize!: number;
    numberOfElements!: number;
    totalPages!: number;
    firstPage!: boolean;
    lastPage!: boolean;
    empty!: boolean;
    pageNumber!: number;
    // instantiating filters
    filters!: Filters;
    filteredSkills!: Observable<string[]>;
    filteredExperience!: Observable<string[]>;
    filteredQualifications!: Observable<string[]>;
    filteredCertifications!: Observable<string[]>;
    /* instantiating controls*/
    qualificationsFilter = new FormControl();
    certificationFilter = new FormControl();
    skillsFilter = new FormControl();
    experienceFilter = new FormControl();
    /* input value*/
    @Input() filterExperience: string = "";


    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.initializeFilters();
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
            console.log(error);
        });
    }

    filterData(){
        this.fetchData(this.skillsFilter.value, this.qualificationsFilter.value, this.certificationFilter.value, this.experienceFilter.value, 0, 10);
    }

    resetData(){
        this.initializeFilters();
        this.fetchData();
    }

    fetchData(skillsFilter: string = 'ALL', qualificationsFilter: string = 'ALL', certificationsFilter: string = 'ALL', experienceFilter: string = 'ALL', page: number = 0, size: number = 10) {
        this.loading = true;
        this.contractors = [];
        this.dashboardSubscription = this.dashboardService.getContractors(skillsFilter,qualificationsFilter,certificationsFilter,experienceFilter, page, size).subscribe(contractors => {
            this.contractors = contractors.content;
            this.totalElements = contractors.totalElements;
            this.totalPages = contractors.totalPages;
            this.pageSize = contractors.size;
            this.pageNumber = contractors.number;
            this.firstPage = contractors.first;
            this.lastPage = contractors.last;
            this.empty = contractors.empty;
            this.loading = false;
        }, error => {
            console.log(error);
            this.loading = false;
        });
    }

    pageChanged(event: PageEvent) {
        this.fetchData(this.skillsFilter.value, this.qualificationsFilter.value, this.certificationFilter.value, this.experienceFilter.value, event.pageIndex, event.pageSize)
    }
    
    initializeFilters(){
        this.filters = {
            skills: ['ALL'],
            qualifications: ['ALL'],
            certifications: ['ALL'],
            experience: ['ALL']
        }
        this.qualificationsFilter.setValue('ALL');
        this.qualificationsFilter.updateValueAndValidity();
        this.certificationFilter.setValue('ALL');
        this.certificationFilter.updateValueAndValidity();
        this.experienceFilter.setValue('ALL');
        this.experienceFilter.updateValueAndValidity();
        this.skillsFilter.setValue('ALL');
        this.skillsFilter.updateValueAndValidity();
    }

    mergeFilters(filters: Filters){
        this.filters.skills.push(...filters.skills);
        this.filters.certifications.push(...filters.certifications);
        this.filters.qualifications.push(...filters.qualifications);
        this.filters.experience.push(...filters.experience);
        this.setupAutocompleteFilters();
        if (this.filterExperience){
            this.experienceFilter.setValue(this.filterExperience);
            this.experienceFilter.updateValueAndValidity();
            this.filterData();
        }
    }

    get skills(): string[] {
        if (!this.filters) return [];
        return this.filters.skills || [];
    }
    
    get certifications(): string[] {
        if (!this.filters) return [];
        return this.filters.certifications || [];
    }
    
    get qualifications(): string[] {
        if (!this.filters) return [];
        return this.filters.qualifications || [];
    }
    
    get experience(): string[] {
        if (!this.filters) return [];
        return this.filters.experience || [];
    }

    get isAuthenticated(): boolean {
        return this.dashboardService.isAuthenticated();
    }

    get noFilters(): boolean {
        return this.skillsFilter.value == 'ALL' && this.qualificationsFilter.value == 'ALL' &&  this.certificationFilter.value == 'ALL' &&  this.experienceFilter.value == 'ALL';
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


