import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetEditorComponent } from './timesheet-editor.component';

describe('TimesheetEditorComponent', () => {
  let component: TimesheetEditorComponent;
  let fixture: ComponentFixture<TimesheetEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
