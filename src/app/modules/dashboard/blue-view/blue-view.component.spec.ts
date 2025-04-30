import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueViewComponent } from './blue-view.component';

describe('BlueViewComponent', () => {
  let component: BlueViewComponent;
  let fixture: ComponentFixture<BlueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
