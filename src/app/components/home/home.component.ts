import { Component, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


import {
  ApexResponsive,
} from "ng-apexcharts";

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


import {
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  isStatusFocused: boolean = false;
  StatusValue: string = '';

  application_status: string = 'updated';
  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions1>;
  public chartOptions2: Partial<ChartOptions2>;
  public chartOptions3: Partial<ChartOptions3>;


  public colors: string[] = ['#008FFB', '#00E396', '#ffae1f', '#FF4560'];
  constructor() {
    this.chartOptions = {
      series: [44, 55, 67, 83],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total Applications",
              formatter: function(w) {
                return "249";
              }
            }
          }
        }
      },
      labels: ["Applied", "Hired", "Interviewing", "Rejected"]
    };


    this.chartOptions1 = {
      series: [
        {
          name: "Application",
          data: [10, 41, 30, 5, 49, 62, 40, 91, 14]
        }
      ],
    
      chart: {
        height: 250,
        type: "area"
      },
    
      dataLabels: {
        enabled: false
      },
    
      stroke: {
        curve: "smooth"
      },
    
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ],
        // Add grid lines for the x-axis if needed
        labels: {
          show: true // This enables x-axis labels
        }
        
      },
    
      yaxis: {
        // Remove background grid lines
        show: false // Set to false to remove the y-axis grid lines
      },
    
      grid: {
        show: false // Set to false to remove the entire grid
      },
    
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    

    this.chartOptions2 = {
      series: [44, 55, 23],
      chart: {
        height:250,
        type: "donut"
      },
      labels: ["LinkedIn", "Indeed", "Naukari", ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  

  
    
  }

  // public generateData(baseval, count, yrange) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  //     var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

  //     series.push([x, y, z]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }

  onStatusFocus() {
    this.isStatusFocused = true;

  }

  onStatusBlur() {
    if (!this.StatusValue) {
      this.isStatusFocused = false;
    }
  }
}
