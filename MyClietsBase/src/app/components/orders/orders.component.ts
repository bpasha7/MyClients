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
  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadCurrnetOrders();
    this.userService.notifyMenu("Планы");
  }

  loadCurrnetOrders() {
    this.userService.getCurrentOrders().subscribe(
      data => {
        this.orders = data.json();
      },
      error => {
        if (error.status === 401) {
          this.userService.goLogin();
          this.snackBar.open('Пароль истек!', 'Закрыть', {
            duration: 2000,
          });
        }
        else {
          this.snackBar.open(error._body, 'Закрыть', {
            duration: 2000,
          });
        }
      }
    );
  }
}
