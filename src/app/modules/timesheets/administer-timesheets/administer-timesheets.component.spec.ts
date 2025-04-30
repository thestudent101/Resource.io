import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministerTimesheetsComponent } from './administer-timesheets.component';

describe('AdministerTimesheetsComponent', () => {
  let component: AdministerTimesheetsComponent;
  let fixture: ComponentFixture<AdministerTimesheetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministerTimesheetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministerTimesheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
