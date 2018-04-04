import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public begin: Date = null;
  public end: Date = null;
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

    // Pie
    public pieChartLabels:string[] = ['Прическа wrwe ewrwer', 'Макияж wrwer we rwe', 'Образ'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    public pieChartOptions: any = {
      responsive: true
      //maintainAspectRatio: false
  };
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Выручка'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Расходы'}
  ];

  constructor() { 
  }

  ngOnInit() {
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
