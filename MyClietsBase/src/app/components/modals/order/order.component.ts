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
import { ENTER, COMMA } from '@angular/cdk/keycodes';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'order-dialog',
    styleUrls: ['./order.component.css'],
    templateUrl: './order.component.html',
})

export class OrderModalComponent implements OnInit {

    filteredProducts: Observable<Product[]>;
    public order: Order;
    // public client: Client;
    public time = '09:00';
    public selectedProduct: Product = null;
    public products: Product[] = [];

    public selectedProducts: Product[] = [];
    productsSelectCtrl: FormControl;
    separatorKeysCodes = [ENTER, COMMA];

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
        this.productsSelectCtrl = new FormControl();

        this.loadProducts();
        this.loadDiscounts();
    }
    //#region Products select control

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
        this.calculate();
    }
    remove(product: Product): void {
        const index = this.selectedProducts.indexOf(product);
        if (index >= 0) {
            this.selectedProducts.splice(index, 1);
        }
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
    //#endregion
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
                this.filteredProducts = this.productsSelectCtrl.valueChanges
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
    validate() {
        if (this.selectedProducts.length !== 0) {
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
    }
    /**
     * Create new one
     */
    create() {
        if (!this.validate) {
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
        if (!this.validate) {
            return;
        }
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
    calculate() {
        let sum = 0;
        this.selectedProducts.forEach(sp => {
            sum += +sp.price;
        });

        //const price = prepay === 0 ? sum : this.order.total;
        if (this.selectedProducts.length !== 0 || this.discountControl.value) {
            this.order.total = sum * (1 - this.discountControl.value) - this.order.prepay;
        } else if (this.productsSelectCtrl.value != null) {
            this.order.total = sum - this.order.prepay;
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}
