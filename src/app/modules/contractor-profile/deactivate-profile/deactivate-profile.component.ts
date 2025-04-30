import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deactivate-profile',
  templateUrl: './deactivate-profile.component.html',
  styleUrls: ['./deactivate-profile.component.css']
})
export class DeactivateProfileComponent implements OnInit {

  btnDisabled = true;
  value = ''

  constructor() { }

  ngOnInit() {
  }

  onKeyPress(event: any) {
    console.log(event);
    console.log(this.value);
    if(this.value == 'confirm') {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
    }
  }

}
