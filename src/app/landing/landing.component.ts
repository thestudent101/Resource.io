import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SessionService } from '../shared/session.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  isOverlayVisible = false;
  teamMembersInteval: any;
  showBackToTopButton: boolean = false;

  testimonial = 1;
  prevTestimonials = 7;
  nextTestimonials = 2;

  teamNumber = 1;
  isSmallScreen: boolean = false;

  

  constructor(private sessionClass: SessionService) { }

  ngOnInit() {
    this.teamMembersInteval = setInterval(()=> { this.myFunc() }, 5 * 1000);
    this.checkScreenSize();

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;

    const scrollThreshold = 4;

    this.showBackToTopButton = scrollY > scrollThreshold;
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 600; 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }


  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  toggleSignupOverlay(){
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  closeSignupOverlay(){
      this.isOverlayVisible = false;
  }

  get privacyPolicyUrl(): string {
    return environment.privacyPolicyUrl;
  }

  myFunc(): void {
    if (this.teamNumber === 10) {
      this.teamNumber = 1;
    } else {
      this.teamNumber = this.teamNumber + 1;
    }

  }

  nextTestimonial(): void {
    if (this.testimonial === 7) {
      this.testimonial = 1;
    } else {
      this.testimonial = this.testimonial + 1;
    }

    if (this.nextTestimonials === 7) {
      this.nextTestimonials = 1;
    } else {
      this.nextTestimonials = this.nextTestimonials + 1;
    }

    if (this.prevTestimonials === 7) {
      this.prevTestimonials = 1;
    } else {
      this.prevTestimonials = this.prevTestimonials + 1;
    }
  }

  prevTestimonial(): void {
    if (this.testimonial === 1) {
      this.testimonial = 7;
    } else {
      this.testimonial = this.testimonial - 1;
    }

    if (this.nextTestimonials === 1) {
      this.nextTestimonials = 7;
    } else {
      this.nextTestimonials = this.nextTestimonials - 1
    }

    if (this.prevTestimonials === 1) {
      this.prevTestimonials = 7;
    } else {
      this.prevTestimonials = this.prevTestimonials - 1;
    }
  }

  ngOnDestroy() {
    clearInterval(this.teamMembersInteval);
  }


}


