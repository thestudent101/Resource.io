import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientWizardComponent } from './register-client-wizard.component';

describe('RegisterClientWizardComponent', () => {
  let component: RegisterClientWizardComponent;
  let fixture: ComponentFixture<RegisterClientWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClientWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClientWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
