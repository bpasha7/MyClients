import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Order, Client, Product, Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
import * as moment from 'moment';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'order-dialog',
    styleUrls: ['./order.component.css'],
    templateUrl: './order.component.html',
})

export class OrderModalComponent {
    public order: Order;
    public client: Client;
    public time = "09:00";
    public selectedProduct: Product = new Product();
    public products: Product[] = [];
    public discounts: Discount[] = [];
    public title: string;
    productControl = new FormControl('', [Validators.required]);
    discountControl = new FormControl('');
    constructor(
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<OrderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data.client != null && data.order == null) {
                this.order = new Order();
                this.client = data.client;
                this.order.clientId = this.client.id;
                //this.title = 'Новая запись';
            } else {
                this.order = data.order;
                this.client = data.client;
            }
            this.title = this.client.firstName;
            this.loadProducts();
            this.loadDiscounts();
    }

    loadProducts() {
        this.userService.getProducts(1).subscribe(
            data => {
                this.products = data.json().products;
                if (this.order.productId != null) {
                    this.selectedProduct = this.products.find(p => p.id === this.order.productId);
                }

            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }

    loadDiscounts() {
        this.userService.getDiscounts(1).subscribe(
            data => {
                this.discounts = data.json().discounts;
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }

    create() {
        this.order.productId = this.selectedProduct.id;
        var splitted = this.time.split(':', 2);
        this.order.date.setHours(parseInt(splitted[0]) - this.order.date.getTimezoneOffset() / 60);
        this.order.date.setMinutes(parseInt(splitted[1]));
        this.userService.createOrder(1, this.order).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                  });
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }
    calculate() {
        if (this.selectedProduct.price != null || this.discountControl.value) {
            this.order.total = this.selectedProduct.price * (1 - this.discountControl.value);
        } else if (this.productControl.value != null) {
            this.order.total = this.selectedProduct.price;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
