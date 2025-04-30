import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignContractorTermsComponent } from './sign-contractor-terms.component';

describe('SignContractorTermsComponent', () => {
  let component: SignContractorTermsComponent;
  let fixture: ComponentFixture<SignContractorTermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignContractorTermsComponent]
    });
    fixture = TestBed.createComponent(SignContractorTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
