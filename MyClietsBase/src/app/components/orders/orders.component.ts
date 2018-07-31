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
    this.userService.getCurrentOrders().subscribe(
      data => {
        this.orders = data.json();
        if (this.orders.current.length === 0 && this.orders.future.length === 0) {
          this.selectedTab = 0;
        }
        if (this.orders.current.length === 0 && this.orders.future.length !== 0) {
          this.selectedTab = 2;
        }
      },
      error => {
        this.userService.responseErrorHandle(error);
      }
    );
  }
}
