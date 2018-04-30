import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Order, Client, Product, Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
import * as moment from 'moment';
import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'order-dialog',
    styleUrls: ['./order.component.css'],
    templateUrl: './order.component.html',
})

export class OrderModalComponent implements OnInit {
    //     this.order = new Order();
    //     this.client = data.client;
    //     this.order.clientId = this.client.id;
    //     //this.title = 'Новая запись';
    // } else {
    //     this.order = data.order;
    //     this.client = data.client;
    // }
    productCtrl: FormControl;
    filteredProducts: Observable<Product[]>;
    public order: Order;
    //public client: Client;
    public time = '09:00';
    public selectedProduct: Product = null;
    public products: Product[] = [];
    public discounts: Discount[] = [];
    public title: string;
    public photoDir = '';
    // productControl = new FormControl('', [Validators.required]);
    discountControl = new FormControl('');
    constructor(
        public config: AppConfig,
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<OrderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.order = data.order;
        //this.client = data.client;
        // if (data.order.id === 0) {
        //     this.order = new Order();
        //     this.client = data.client;
        //     this.order.clientId = this.client.id;
        //     //this.title = 'Новая запись';
        // } else {
        //     this.order = data.order;
        //     this.client = data.client;
        // }
        //this.title = this.client.firstName;
    }

    ngOnInit(): void {
        this.photoDir = this.config.photoUrl + localStorage.getItem('userHash') + '/';
        this.productCtrl = new FormControl();

        this.loadProducts();
        this.loadDiscounts();
    }

    filterProducts(name: string): Product[] {
        return this.products.filter(product =>
            product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    displayProduct(product?: Product): string {
        return product ? product.name : '';
    }

    generateProductPhotoUrl(product: Product) {
        return product.hasPhoto ? this.photoDir + product.id + '_p.jpg' : this.config.defaultPhoto;
    }

    selectProduct (e: Event) {
        this.calculate();
    }

    clearProductSelect(e: Event) {
        this.selectedProduct = new Product();
        this.selectedProduct.name = '';
        this.selectedProduct.price = 0;
    }

    loadProducts() {
        this.userService.getProducts().subscribe(
            data => {
                this.products = data.json().products;
                if (this.order.productId !== undefined) {
                    this.selectedProduct = this.products.find(p => p.id === this.order.productId);
                } else {
                    this.selectedProduct = new Product();
                    this.selectedProduct.name = '';
                    this.selectedProduct.price = 0;
                }
                this.filteredProducts = this.productCtrl.valueChanges
                .pipe(
                  startWith<string | Product>(''),
                  map(value => typeof value === 'string' ? value : value.name),
                  map(name => name ? this.filterProducts(name) : this.products.slice())
                );
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }

    loadDiscounts() {
        this.userService.getDiscounts().subscribe(
            data => {
                this.discounts = data.json().discounts;
            },
            // tslint:disable-next-line:no-shadowed-variable
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
        this.userService.createOrder(this.order).subscribe(
            data => {
                this.order.id = data.json().orderId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(1);
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
        } else if (this.productCtrl.value != null) {
            this.order.total = this.selectedProduct.price;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
