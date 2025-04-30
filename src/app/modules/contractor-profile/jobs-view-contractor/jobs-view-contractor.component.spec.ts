import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsViewContractorComponent } from './jobs-view-contractor.component';

describe('JobsViewContractorComponent', () => {
  let component: JobsViewContractorComponent;
  let fixture: ComponentFixture<JobsViewContractorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsViewContractorComponent]
    });
    fixture = TestBed.createComponent(JobsViewContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
