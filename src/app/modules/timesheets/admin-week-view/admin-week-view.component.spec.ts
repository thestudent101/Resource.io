import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWeekViewComponent } from './admin-week-view.component';

describe('AdminWeekViewComponent', () => {
  let component: AdminWeekViewComponent;
  let fixture: ComponentFixture<AdminWeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWeekViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
