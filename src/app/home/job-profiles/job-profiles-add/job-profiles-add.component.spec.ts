import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfilesAddComponent } from './job-profiles-add.component';

describe('JobProfilesAddComponent', () => {
  let component: JobProfilesAddComponent;
  let fixture: ComponentFixture<JobProfilesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfilesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfilesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
