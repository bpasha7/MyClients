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

  public end: Date = new Date();
  public begin: Date = new Date(this.end.getFullYear(), this.end.getMonth(), 1);
  //Bar
  public barChartLabels: string[] = [];//'2006', '2007', '2008', '2009', '2010', '2011', '2012'
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Выручка' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Расходы' }
  ];
  // Pie
  public pieChartLabels: string[] = ["123", "333"];
  public pieChartData: Array<any>;
  public pieChartType: string = 'pie';
  public pieChartOptions: any = {
    responsive: true
    //maintainAspectRatio: false
  };



  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.getReport();
  }
  /**
   * loading report
   */
  public getReport() {
    this.userService.getReport(this.begin, this.end).subscribe(
      data => {
        const productReport = data.json().report;
        const monthReport = data.json().monthReport;
        let _pieChartLabels = new Array();
        let _pieChartData = new Array();
        productReport.forEach(element => {
          _pieChartLabels.push(element['productName']);
          _pieChartData.push(element['sum']);
        });
        this.pieChartData = [{ data: _pieChartData}];
        this.pieChartLabels = _pieChartLabels;

        let _barChartLabels = new Array();
        let _barChartOrders = new Array();
        let _barChartOutgoings = new Array();
        monthReport.forEach(element => {
          _barChartLabels.push(element['month']);
          _barChartOrders.push(element['total']);
          _barChartOutgoings.push(element['outgoings']);
        });
        
        this.barChartLabels = _barChartLabels;
        this.barChartData = [
          { data: _barChartOrders, label: 'Выручка' },
          { data: _barChartOutgoings, label: 'Расходы' }
        ];
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
