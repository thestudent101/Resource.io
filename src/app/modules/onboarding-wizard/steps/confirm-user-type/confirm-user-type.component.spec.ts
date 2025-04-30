import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserTypeComponent } from './confirm-user-type.component';

describe('ConfirmUserTypeComponent', () => {
  let component: ConfirmUserTypeComponent;
  let fixture: ComponentFixture<ConfirmUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
