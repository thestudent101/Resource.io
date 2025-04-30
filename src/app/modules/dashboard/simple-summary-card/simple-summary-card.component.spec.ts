import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSummaryCardComponent } from './simple-summary-card.component';

describe('SimpleSummaryCardComponent', () => {
  let component: SimpleSummaryCardComponent;
  let fixture: ComponentFixture<SimpleSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
