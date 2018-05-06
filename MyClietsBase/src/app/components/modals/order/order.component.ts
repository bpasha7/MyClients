import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Order, Client, Product, Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
import * as moment from 'moment';
import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';

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
    // public client: Client;
    public time = '09:00';
    public selectedProduct: Product = null;
    public products: Product[] = [];
    public discounts: Discount[] = [];
    public title: string;
    public photoDir = '';
    public inProc = false;
    // productControl = new FormControl('', [Validators.required]);
    discountControl = new FormControl('');
    constructor(
        public config: AppConfig,
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<OrderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.order = data.order;
    }

    ngOnInit(): void {
        this.photoDir = this.config.photoUrl + localStorage.getItem('userHash') + '/';
        this.productCtrl = new FormControl();

        this.loadProducts();
        this.loadDiscounts();
    }
    /**
     * Filtering products by name
     * @param name typing product name
     */
    filterProducts(name: string): Product[] {
        return this.products.filter(product =>
            product.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
    /**
     * Display format selected product
     * @param product selected product
     */
    displayProduct(product?: Product): string {
        return product ? product.name : '';
    }
    /**
     * Generating photo url for product
     * @param product product
     */
    generateProductPhotoUrl(product: Product) {
        return product.hasPhoto ? this.photoDir + product.id + '_p.jpg' : this.config.defaultPhoto;
    }
    /**
     * Event after selected new product
     * @param e
     */
    selectProduct (e: Event) {
        this.calculate();
    }
    /**
     * Clear selected product
     * @param e
     */
    clearProductSelect(e: Event) {
        this.selectedProduct = new Product();
        this.selectedProduct.name = '';
        this.selectedProduct.price = 0;
    }
    /**
     * Loading products and create filter
     */
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
    /**
     * Loading discounts
     */
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
    /**
     * Create new one
     */
    create() {
        if (this.selectedProduct.id === undefined) {
            this.snackBar.open('Не выбран продукт!', 'Закрыть', {
                duration: 2000,
            });
            return;
        }
        if (this.order.date === undefined) {
            this.snackBar.open('Не выбрана дата!', 'Закрыть', {
                duration: 2000,
            });
            return;
        }
        this.order.productId = this.selectedProduct.id;
        const splitted = this.time.split(':', 2);
        // tslint:disable-next-line:radix
        this.order.date.setHours(parseInt(splitted[0]) - this.order.date.getTimezoneOffset() / 60);
        // tslint:disable-next-line:radix
        this.order.date.setMinutes(parseInt(splitted[1]));
        this.inProc = true;
        this.userService.createOrder(this.order).subscribe(
            data => {
                this.order.id = data.json().orderId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(1);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }
    /**
     * Update order
     */
    update() {
        this.order.productId = this.selectedProduct.id;
        this.order.date = new Date(this.order.date);
        const splitted = this.time.split(':', 2);
        // tslint:disable-next-line:radix
        this.order.date.setHours(parseInt(splitted[0]) - this.order.date.getTimezoneOffset() / 60);
        // tslint:disable-next-line:radix
        this.order.date.setMinutes(parseInt(splitted[1]));
        this.inProc = true;
        this.userService.updateOrder(this.order).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(1);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }
    /**
     * Calculating order total price
     */
    calculate(prepay: number = 0) {
        const price = prepay === 0 ? this.selectedProduct.price  : this.order.total;
        if (this.selectedProduct.price != null || this.discountControl.value) {
            this.order.total = price * (1 - this.discountControl.value) - this.order.prepay;
        } else if (this.productCtrl.value != null) {
            this.order.total = price - this.order.prepay;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
