import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureContractorDetailComponent } from './secure-contractor-detail.component';

describe('SecureContractorDetailComponent', () => {
  let component: SecureContractorDetailComponent;
  let fixture: ComponentFixture<SecureContractorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureContractorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureContractorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
