import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RateSummary } from '../dashboard-models';

@Component({
  selector: 'two-row-summary-card',
  templateUrl: './two-row-summary-card.component.html',
  styleUrls: ['./two-row-summary-card.component.css']
})
export class TwoRowSummaryCardComponent implements OnInit, OnDestroy {
    /** Names of the properties that will be set as inputs on the parent component */
    @Input() title: string = "";
    @Input() summary!: RateSummary;
    @Input() info: string = "";
    @Input() route: string = "";
    visibleTotal: number = 0;
    infoVisible = false;
    totalStep = 0;
    timerSubscription!: Subscription;

    constructor() { }

    ngOnInit() {
        this.totalStep = Math.ceil(this.summary.total / 20);
        this.timerSubscription = interval(60).subscribe(() =>  this.timerEvent());  
    }

    timerEvent(){
        if (this.visibleTotal < this.summary.total){
            this.visibleTotal += this.totalStep;
        } else {
            this.visibleTotal = this.summary.total;
            this.timerSubscription.unsubscribe();
        }
    }

    ngOnDestroy(){
        if (this.timerSubscription) this.timerSubscription.unsubscribe();
    }

    toggleInfo(){
        this.infoVisible = !this.infoVisible;
    }
    get ratePerHour(): number {
        return this.summary.ratePerHour;
    }

    get hasRoute(): boolean {
        return this.route.length > 0;
    }

    get hasInfo(): boolean {
        return this.info.length > 0;
    }    
}
