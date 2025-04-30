import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTimeDurationPickerComponent } from './custom-time-duration-picker.component';

describe('CustomTimeDurationPickerComponent', () => {
  let component: CustomTimeDurationPickerComponent;
  let fixture: ComponentFixture<CustomTimeDurationPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTimeDurationPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTimeDurationPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
