import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoRowSummaryCardComponent } from './two-row-summary-card.component';

describe('TwoRowSummaryCardComponent', () => {
  let component: TwoRowSummaryCardComponent;
  let fixture: ComponentFixture<TwoRowSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoRowSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoRowSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
