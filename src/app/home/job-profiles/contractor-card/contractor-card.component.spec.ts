import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorCardComponent } from './contractor-card.component';

describe('ContractorCardComponent', () => {
  let component: ContractorCardComponent;
  let fixture: ComponentFixture<ContractorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
