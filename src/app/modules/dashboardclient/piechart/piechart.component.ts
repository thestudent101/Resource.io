import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexFill,
  ApexDataLabels,
  ApexLegend,
  ChartComponent
} from "ng-apexcharts";
import { Statistics } from '../../dashboard/dashboard-models';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  @Input() data!: Statistics;
  public chartOptions: Partial<ChartOptions> | any;

  constructor() {
  }

  series:number[] = [];
  label:string[] = [];

  ngOnInit(): void {    
    this.chartOptions = {
      series: [this.data.summaryJuniorContractors.total,this.data.summaryIntermediateContractors.total,this.data.summarySeniorContractors.total],
      chart: {
        width: 380,
        height: 211,
        type: "donut"
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient"
      },
      labels: [this.data.summaryJuniorContractors.total+": Total Junior Consultants",this.data.summaryIntermediateContractors.total+": Total Intermediate Consultants",this.data.summarySeniorContractors.total+": Total Senior Consultants"],
      legend: {
        formatter: function(val:any, opts:any) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
