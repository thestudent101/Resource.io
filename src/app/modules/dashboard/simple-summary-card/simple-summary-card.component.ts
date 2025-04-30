import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'simple-summary-card',
    templateUrl: './simple-summary-card.component.html',
    styleUrls: ['./simple-summary-card.component.css']
})
export class SimpleSummaryCardComponent implements OnInit, OnDestroy {
    /** Names of the properties that will be set as inputs on the parent component */
    @Input() title: string = "";
    @Input() total: number = 0;
    @Input() info: string = "";
    @Input() route: string = "";
    visibleTotal: number = 0;
    infoVisible = false;
    totalStep = 0;
    timerSubscription!: Subscription;

    constructor() { }

    ngOnInit() {
        this.totalStep = Math.ceil(this.total / 20);
        this.timerSubscription = interval(60).subscribe(() =>  this.timerEvent());  
    }

    timerEvent(){
        if (this.visibleTotal < this.total){
            this.visibleTotal += this.totalStep;
        } else {
            this.visibleTotal = this.total;
            this.timerSubscription.unsubscribe();
        }
    }

    ngOnDestroy(){
        if (this.timerSubscription) this.timerSubscription.unsubscribe();
    }

    toggleInfo(){
        this.infoVisible = !this.infoVisible;
    }

    get hasRoute(): boolean {
        return this.route.length > 0;
    }

    get hasInfo(): boolean {
        return this.info.length > 0;
    }    
}
