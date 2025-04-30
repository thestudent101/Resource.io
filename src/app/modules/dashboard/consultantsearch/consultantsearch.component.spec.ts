import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultantsearchComponent } from './consultantsearch.component';

describe('ConsultantsearchComponent', () => {
  let component: ConsultantsearchComponent;
  let fixture: ComponentFixture<ConsultantsearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultantsearchComponent]
    });
    fixture = TestBed.createComponent(ConsultantsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
