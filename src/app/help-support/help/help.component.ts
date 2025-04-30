import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/session.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  @ViewChild(MatAccordion, { static: false })
  accordion: MatAccordion = new MatAccordion; 
  isContractor: boolean = true;
  

  constructor( private router: Router,private sessionService: SessionService) { }

  ngOnInit() {
       // Fetch the user type from your SessionService
      const userType = this.sessionService.getUserType();

      // Determine if the user is a contractor
      this.isContractor = userType === 'contractor';
  }


  goBack() {
    this.router.navigate(['/main/contractor-profile']);
  }

}
