import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorJobProfilesViewComponent } from './contractor-job-profiles-view.component';

describe('ContractorJobProfilesViewComponent', () => {
  let component: ContractorJobProfilesViewComponent;
  let fixture: ComponentFixture<ContractorJobProfilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorJobProfilesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorJobProfilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
