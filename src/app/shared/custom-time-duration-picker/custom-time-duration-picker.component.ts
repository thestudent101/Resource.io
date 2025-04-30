import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-custom-time-duration-picker',
    templateUrl: './custom-time-duration-picker.component.html',
    styleUrls: ['./custom-time-duration-picker.component.css']
})
export class CustomTimeDurationPickerComponent implements OnInit {

    private minutesPerHour = 60;
    // input value in minutes
    @Input() value: number = 0;
    @Input() debug: boolean = false;
    @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
    hours: number = 0;
    minutes: number = 0;

    constructor() { 
        console.log(this.value);
    }

    ngOnInit(): void {
        this.splitValue();
    }
    
    inputChanges(): void {
        this.combineValue();
        this.valueChange.emit(this.value);
    }

    private splitValue(){
        this.hours = Math.floor(this.value / this.minutesPerHour);
        this.minutes = this.value % this.minutesPerHour;
    }

    private combineValue(){
        this.value = (this.hours * this.minutesPerHour) + this.minutes;
    }

}
