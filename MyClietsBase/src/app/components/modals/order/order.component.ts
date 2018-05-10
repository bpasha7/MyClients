import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Order, Client, Product, Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
import * as moment from 'moment';
import { AppConfig } from '../../../app.config';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'order-dialog',
    styleUrls: ['./order.component.css'],
    templateUrl: './order.component.html',
})

export class OrderModalComponent implements OnInit {

    filteredProducts: Observable<Product[]>;
    public order: Order;
    public time;
    public products: Product[] = [];

    public selectedProducts: Product[] = [];
    productsSelectCtrl: FormControl;
    separatorKeysCodes = [ENTER];

    public discounts: Discount[] = [];
    public title: string;
    public photoDir = '';
    public inProc = false;
    discountControl = new FormControl('');
    constructor(
        public config: AppConfig,
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<OrderModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.products = data.products;
        this.order = data.order;
    }

    ngOnInit(): void {
        this.photoDir = this.config.photoUrl + localStorage.getItem('userHash') + '/';
        //const myDate = new Date();
        this.order.date = new Date(this.order.date);
        this.order.datePrepay = new Date(this.order.datePrepay);
        this.time = ('0' + this.order.date.getHours()).slice(-2) + ':' + ('0' + this.order.date.getMinutes()).slice(-2);
        this.productsSelectCtrl = new FormControl();
        this.initProducts();
        this.loadDiscounts();
    }
    //#region Products select control

    // tslint:disable-next-line:member-ordering
    @ViewChild('productsSelectInput') productsSelectInput: ElementRef;

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
    selectProduct(event: MatAutocompleteSelectedEvent) {
        const selectedProduct: Product = event.option.value;
        this.selectedProducts.push(selectedProduct);
        // this.productsSelectCtrl.setValue(' ');
        this.calculate();
    }
    remove(product: Product): void {
        const index = this.selectedProducts.indexOf(product);
        if (index >= 0) {
            this.selectedProducts.splice(index, 1);
        }
        this.calculate();
    }
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }
    /**
     * Clear selected product
     * @param e
     */
    // clearProductSelect(e: Event) {
    //     this.selectedProduct = new Product();
    //     this.selectedProduct.name = '';
    //     this.selectedProduct.price = 0;
    // }
    //#endregion
    /**
     * Init products and create filter
     */
    initProducts() {
        this.filteredProducts = this.productsSelectCtrl.valueChanges
            .pipe(
                startWith<string | Product>(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this.filterProducts(name) : this.products.slice())
            );
        if (this.order.productsId !== undefined) {
            this.order.productsId.forEach(productId => {
                this.selectedProducts.push(this.products.find(p => p.id === productId));
            });
        }
    }
    /**
     * Loading discounts
     */
    loadDiscounts() {
        this.userService.getDiscounts().subscribe(
            data => {
                this.discounts = data.json().discounts;
                //this.discounts.push({id: 0, name: 'Без'})
                this.discountControl.setValue(0);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.userService.responseErrorHandle(error);
            }
        );
    }
    validate() {
        if (this.selectedProducts.length === 0) {
            this.snackBar.open('Не выбраны позиции!', 'Закрыть', {
                duration: 2000,
            });
            return false;
        }
        if (this.order.date === undefined) {
            this.snackBar.open('Не выбрана дата!', 'Закрыть', {
                duration: 2000,
            });
            return false;
        }
        // this.order.productId = this.selectedProduct.id;
        this.order.productsId = this.selectedProducts.map(p => p.id);
        const splitted = this.time.split(':', 2);
        // tslint:disable-next-line:radix
        this.order.date.setHours(parseInt(splitted[0]) - this.order.date.getTimezoneOffset() / 60);
        this.order.datePrepay.setHours(-this.order.date.getTimezoneOffset() / 60);
        // tslint:disable-next-line:radix
        this.order.date.setMinutes(parseInt(splitted[1]));
        return true;
    }
    /**
     * Create new one
     */
    create() {
        if (!this.validate()) {
            return;
        }
        this.inProc = true;
        this.userService.createOrder(this.order).subscribe(
            data => {
                this.order.id = data.json().orderId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.order.label = this.selectedProducts.map(p => p.name).toString();
                this.dialogRef.close(1);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.userService.responseErrorHandle(error);
            }
        );
    }
    /**
     * Update order
     */
    update() {
        if (!this.validate()) {
            return;
        }
        this.inProc = true;
        this.userService.updateOrder(this.order).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.order.label = this.selectedProducts.map(p => p.name).toString();                
                this.dialogRef.close(1);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.userService.responseErrorHandle(error);
            }
        );
    }
    /**
     * Calculating order total price
     */
    calculate() {
        let sum = 0;
        this.selectedProducts.forEach(sp => {
            sum += +sp.price;
        });

        const discountVal = this.discounts.find(d => d.id === this.discountControl.value).percent;

        // const price = prepay === 0 ? sum : this.order.total;
        if (this.selectedProducts.length !== 0) {
            this.order.total = sum * (1 - discountVal) - this.order.prepay;
        } else if (this.productsSelectCtrl.value != null) {
            this.order.total = sum - this.order.prepay;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
