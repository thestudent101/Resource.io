import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOnboardingComponent } from './client-onboarding.component';

describe('ClientOnboardingComponent', () => {
  let component: ClientOnboardingComponent;
  let fixture: ComponentFixture<ClientOnboardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientOnboardingComponent]
    });
    fixture = TestBed.createComponent(ClientOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
