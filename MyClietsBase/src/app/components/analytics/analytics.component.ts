import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
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
  // Total
  public totalChartLabels: string[] = [];
  public totalChartData: any[] = [];
  // Bar
  public barChartLabels: string[] = [];
 // public barChartType: string = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [];
  // Pie
  public pieChartLabels: string[] = [];
  public pieChartData: Array<any>;
  public pieChartOptions: any = {
    responsive: true
    // maintainAspectRatio: false
  };

  public show = false;


  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
  ) {  }

  ngOnInit() {
    this.getReport();
    this.userService.notifyMenu('Статистика');
  }
  /**
   * loading report
   */
  public getReport() {
    this.userService.getReport(this.begin, this.end).subscribe(
      data => {
        const productReport = data.json().report;
        const monthReport = data.json().monthReport;
        const _pieChartLabels = new Array();
        const _pieChartData = new Array();
        productReport.forEach(element => {
          _pieChartLabels.push(element['productName']);
          _pieChartData.push(element['sum']);
        });
        this.pieChartData = [{ data: _pieChartData }];
        this.pieChartLabels = _pieChartLabels;

        const _barChartLabels = new Array();
        const _barChartOrders = new Array();
        const _barChartOutgoings = new Array();
        const _totalChartData = new Array();
        monthReport.forEach(element => {
          _barChartLabels.push(element['month']);
          _totalChartData.push(element['total'] - element['outgoings']);
          _barChartOrders.push(element['total']);
          _barChartOutgoings.push(element['outgoings']);
        });

        this.barChartLabels = _barChartLabels;
        this.barChartData = [
          { data: _barChartOrders, label: 'Выручка' },
          { data: _barChartOutgoings, label: 'Расходы' }
        ];
        this.totalChartData = [
          { data: _totalChartData, label: 'Прибыль' },
        ];
        this.show = true;
      },
      error => {
        this.userService.responseErrorHandle(error);
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
