import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
//import { Orders } from '../../models/index';
import { UserService } from '../../services/index';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  public begin: Date = null;
  public end: Date = null;
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  // Pie
  public pieChartLabels: string[] = ["123", "333"];
  public pieChartData: number[] = [1, 2];
  //public lineChartData: Array<any> [];
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    responsive: true
    //maintainAspectRatio: false
  };

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Выручка' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Расходы' }
  ];

  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
  }

  public getReport() {
    this.userService.getReport(this.begin, this.end).subscribe(
      data => {
        const productReport = data.json().report;
        let _pieChartLabels = new Array(4);
        let _pieChartData = new Array(4);
        //this.lineChartData = new Array(4);
        productReport.forEach(element => {
          //_pieChartData[0] = {data: element['sum'], label: element['sum']};
          _pieChartLabels.push(element['productName']);
          _pieChartData.push(element['sum']);
        });
        this.pieChartData = _pieChartData;
        this.pieChartLabels = _pieChartLabels;
      }, 
      error => {
          this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
              duration: 2000,
          });
      }
  );
  }

  // // events
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

}
