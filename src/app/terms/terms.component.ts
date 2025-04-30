import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session.service';



@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger('slide', [
      state('privacy', style({ left: '0%' })),
      state('terms', style({ left: '50%' })),
      transition('privacy <=> terms', animate('300ms ease-out')),
    ]),
  ],

})
export class TermsComponent implements OnInit {
  activeSection = 'privacy';
  privacy = true;
  terms = false;
  isContractor: boolean = true;

  constructor(private router: Router, private sessionService: SessionService) {}


  // This allows us to click on the heading within the table of contents and for the viewport to jump to that section.
  public onClick(elementId: string): void
  { 

  }
  
  ngOnInit() {
     // Fetch the user type from your SessionService
  const userType = this.sessionService.getUserType();

  // Determine if the user is a contractor
  this.isContractor = userType === 'contractor';
  }

  showprivacy() {
    this.activeSection = 'privacy';
    this.privacy = true;
    this.terms = false;
  }

  showterms() {
    this.activeSection = 'terms';
    this.privacy = false;
    this.terms = true;
  }

  goBack() {
    this.router.navigate(['/main/contractor-profile']);
  }

  getButtonStyle(section: string) {
    return { borderBottom: this.activeSection === section ? '9px solid #017DB5' : 'none' };
  }

 

}
