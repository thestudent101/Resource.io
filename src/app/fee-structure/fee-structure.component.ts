 import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
  last: string
}

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrls: ['./fee-structure.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class FeeStructureComponent implements OnInit {
  currentStep = 1;


  constructor() { }

  ngOnInit() {
  }


  setStep(val: number): void {
    this.currentStep = val;
  }

}
