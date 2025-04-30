import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptPermissionsStepComponent } from './accept-permissions-step.component';

describe('AcceptPermissionsStepComponent', () => {
  let component: AcceptPermissionsStepComponent;
  let fixture: ComponentFixture<AcceptPermissionsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptPermissionsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptPermissionsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
