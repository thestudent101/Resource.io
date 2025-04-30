import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfilesMatchComponent } from './job-profiles-match.component';

describe('JobProfilesMatchComponent', () => {
  let component: JobProfilesMatchComponent;
  let fixture: ComponentFixture<JobProfilesMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfilesMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfilesMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
