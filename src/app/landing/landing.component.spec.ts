import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';

describe('Landing Component', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    return TestBed.configureTestingModule({
      declarations: [ LandingComponent ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(LandingComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
