import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentStep = 1;

  constructor() { }

  ngOnInit(): void {
  }

  setStep(val: number): void {
    this.currentStep = val;
  }

}
