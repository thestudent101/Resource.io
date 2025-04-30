import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmSubscriptionDialogComponent } from './confirm-subscription-dialog.component';

describe('ConfirmSubscriptionDialogComponent', () => {
  let component: ConfirmSubscriptionDialogComponent;
  let fixture: ComponentFixture<ConfirmSubscriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmSubscriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
