import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfilesViewComponent } from './job-profiles-view.component';

describe('JobProfilesViewComponent', () => {
  let component: JobProfilesViewComponent;
  let fixture: ComponentFixture<JobProfilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfilesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
