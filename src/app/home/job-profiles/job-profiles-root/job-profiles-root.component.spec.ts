import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobProfilesRootComponent } from './job-profiles-root.component';

describe('JobProfilesRootComponent', () => {
  let component: JobProfilesRootComponent;
  let fixture: ComponentFixture<JobProfilesRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobProfilesRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobProfilesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
