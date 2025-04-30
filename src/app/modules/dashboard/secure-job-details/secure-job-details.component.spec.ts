import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureJobDetailsComponent } from './secure-job-details.component';

describe('SecureJobDetailsComponent', () => {
  let component: SecureJobDetailsComponent;
  let fixture: ComponentFixture<SecureJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
