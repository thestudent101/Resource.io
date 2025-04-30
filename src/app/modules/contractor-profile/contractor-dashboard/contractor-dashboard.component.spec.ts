import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorDashboardComponent } from './contractor-dashboard.component';

describe('ContractorDashboardComponent', () => {
  let component: ContractorDashboardComponent;
  let fixture: ComponentFixture<ContractorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractorDashboardComponent]
    });
    fixture = TestBed.createComponent(ContractorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
