import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredContractorViewComponent } from './filtered-contractor-view.component';

describe('FilteredContractorViewComponent', () => {
  let component: FilteredContractorViewComponent;
  let fixture: ComponentFixture<FilteredContractorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredContractorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredContractorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
