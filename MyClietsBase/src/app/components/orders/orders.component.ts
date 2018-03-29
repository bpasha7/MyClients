import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/index';
import { UserService } from '../../services/index';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadCurrnetOrders();
  }

  loadCurrnetOrders() {
    this.userService.getCurrentOrders().subscribe(
      data => {
        this.orders = data.json().orders;
      },
      error => {
        // this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
        //     duration: 2000,
        //});
      }
    );
  }
}
