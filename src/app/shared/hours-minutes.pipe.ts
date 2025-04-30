import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hoursMinutes'
})
export class HoursMinutesPipe implements PipeTransform {

    hours: number = 0;
    minutes: number = 0;
    minutesPerHour: number = 60;

    transform(value: number): string {
        if (value == 0) return "-";
        this.splitValue(value);
        return this.formatValue();
    }

    private formatValue(): string {
        return this.hours + "h " + this.minutes + "m"
    }

    private splitValue(value: number){
        this.hours = Math.floor(value / this.minutesPerHour);
        this.minutes = value % this.minutesPerHour;
    }

}
