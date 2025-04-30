import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordWizardComponent } from './forgot-password-wizard.component';

describe('ForgotPasswordWizardComponent', () => {
  let component: ForgotPasswordWizardComponent;
  let fixture: ComponentFixture<ForgotPasswordWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordWizardComponent);
    fixture.detectChanges();
  });
});
