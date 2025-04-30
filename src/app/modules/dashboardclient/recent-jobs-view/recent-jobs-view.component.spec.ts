import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentJobsViewComponent } from './recent-jobs-view.component';

describe('RecentJobsViewComponent', () => {
  let component: RecentJobsViewComponent;
  let fixture: ComponentFixture<RecentJobsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentJobsViewComponent]
    });
    fixture = TestBed.createComponent(RecentJobsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
