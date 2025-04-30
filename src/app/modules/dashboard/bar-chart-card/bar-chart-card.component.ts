import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { KeyValueSummary } from '../dashboard-models';

@Component({
    selector: 'bar-chart-card',
    templateUrl: './bar-chart-card.component.html',
    styleUrls: ['./bar-chart-card.component.css']
})
export class BarChartCardComponent implements OnInit {
    /*
        barChartLabel: Label[] = ['SAP', 'Technician', 'Administrator', 'Finance', 'DBA', 'Software Developer', 'BI Analyst', 'Database', 'Java Developer'];
        barChartData: ChartDataSets[] = [
            { data: [45, 37, 60, 70, 46, 33, 67, 12, 45, 12], label: 'Count of Candidate ID by Type of Resource'}
        ];*/


    @Input() title: string = "";
    @Input() info: string = "";
    @Input() label: any[] = [];
    @Input() data: KeyValueSummary[] = [];
    barChartLabel: any[] = [];
    barChartData: ChartDataset[] = [];
    infoVisible = false;


    topSkills:any = [];
    skillLogos = ['sap.png','sap.png','agile.png','java.png','asp.png','aws.png','ba.jpg','c-sharp.jpg','dm.png','pbi.png']

    constructor() { }

    ngOnInit() {
        this.barChartLabel = this.data.map(value => value.name);
        this.barChartData = [{data: this.data.map(value => value.count), label: this.title}];

        
        for(var x = 0; x < 10; x++) {
            var str = this.barChartLabel[x].toString();
            var newStr = str.replace(' ', '-');
            newStr = newStr.toLowerCase();

            if (newStr == 'c#') {
                newStr = 'c-sharp';
            }
            
            var skillData = {
                name: this.barChartLabel[x],
                skillValue: this.barChartData[0].data[x],
                logo: newStr + '.png'
            };

            this.topSkills.push(skillData);
        }

    }

    toggleInfo() {
        this.infoVisible = !this.infoVisible;
    }

    get hasInfo(): boolean {
        return this.info.length > 0;
    }

    get chartVisible(): boolean {
        return this.barChartData != null && this.barChartData.length > 0;
    }

    /* Chart Options */
    barChartColors: any[] = [
        {
            backgroundColor: '#022641', borderColor: 'rgb(103, 58, 183)',
            pointBackgroundColor: 'rgb(103, 58, 183)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
        }
    ];
    // barChartOptions: ChartOptions = {
    //     responsive: true,
    //     legend: {
    //         labels: { fontColor: 'white' }
    //     },
    //     scales: {
            
    //         xAxes: [{
    //             ticks: { fontColor: 'white' },
    //             gridLines: { color: 'rgba(255,255,255,0.1)' }
    //         }],
    //         yAxes: [{
    //             ticks: { 
    //                 beginAtZero: true,
    //                 fontColor: 'white'
    //              },
    //             gridLines: { color: 'rgba(255,255,255,0.1)' }
    //         }]
    //     }
    // };
    barChartType: ChartType = 'bar';
    barChartLegend = false;
    barChartPlugins = [];

}
