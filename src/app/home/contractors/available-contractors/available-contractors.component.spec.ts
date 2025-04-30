import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableContractorsComponent } from './available-contractors.component';

describe('AvailableContractorsComponent', () => {
  let component: AvailableContractorsComponent;
  let fixture: ComponentFixture<AvailableContractorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableContractorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableContractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
