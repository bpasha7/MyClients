import { Component, OnInit } from '@angular/core';
import { Orders } from '../../models/index';
import { UserService } from '../../services/index';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Orders = null;
  busy: boolean;
  selectedTab = 1;
  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadCurrnetOrders();
    this.userService.notifyMenu('Планы');
  }

  loadCurrnetOrders() {
    this.busy = true;
    this.userService.getCurrentOrders().subscribe(
      data => {
        this.orders = data.json();
        if (this.orders.current.length === 0 && this.orders.feature.length === 0) {
          this.selectedTab = 0;
        }
        if (this.orders.current.length === 0 && this.orders.feature.length !== 0) {
          this.selectedTab = 2;
        }
        this.busy = false;
      },
      error => {
        this.busy = false;
        this.userService.responseErrorHandle(error);
      }
    );
  }
}
