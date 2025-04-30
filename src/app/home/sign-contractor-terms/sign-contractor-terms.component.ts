import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-contractor-terms',
  templateUrl: './sign-contractor-terms.component.html',
  styleUrls: ['./sign-contractor-terms.component.css']
})
export class SignContractorTermsComponent {


constructor(private router: Router) { }

ngOnInit() {
}

goBack() {
  this.router.navigateByUrl('main/candidate');
}
}