import {ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterConsultantWizardComponent } from './register-consultant-wizard.component';

describe('RegisterConsultantWizardComponent', () => {
  let component: RegisterConsultantWizardComponent;
  let fixture: ComponentFixture<RegisterConsultantWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterConsultantWizardComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(RegisterConsultantWizardComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterConsultantWizardComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
