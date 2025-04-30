import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUsersStepComponent } from './invite-users-step.component';

describe('InviteUsersStepComponent', () => {
  let component: InviteUsersStepComponent;
  let fixture: ComponentFixture<InviteUsersStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteUsersStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteUsersStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
