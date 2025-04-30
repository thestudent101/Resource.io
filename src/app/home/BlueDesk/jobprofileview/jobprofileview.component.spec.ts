import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobprofileviewComponent } from './jobprofileview.component';

describe('JobprofileviewComponent', () => {
  let component: JobprofileviewComponent;
  let fixture: ComponentFixture<JobprofileviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobprofileviewComponent]
    });
    fixture = TestBed.createComponent(JobprofileviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
