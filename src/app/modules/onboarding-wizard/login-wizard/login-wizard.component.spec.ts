import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWizardComponent } from './login-wizard.component';

describe('LoginWizardComponent', () => {
  let component: LoginWizardComponent;
  let fixture: ComponentFixture<LoginWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWizardComponent);
    fixture.detectChanges();
  });
});
