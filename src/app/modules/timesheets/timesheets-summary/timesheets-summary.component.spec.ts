import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetsSummaryComponent } from './timesheets-summary.component';

describe('TimesheetsSummaryComponent', () => {
  let component: TimesheetsSummaryComponent;
  let fixture: ComponentFixture<TimesheetsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
