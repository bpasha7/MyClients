import { Component, ViewChild, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl, MatTabChangeEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product, Discount } from '../../models/index';
import { UserService } from '../../services/index';
import { ProductModalComponent,
    DiscountModalComponent,
    PhotoModalComponent,
    MessagePreviewComponent,
    ConfirmationComponent
} from '../modals';
import { AppConfig } from '../../app.config';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    [x: string]: any;
    public displayedProductColumns = ['name', 'price'];
    public displayedDiscountColumns = ['name', 'percent'];
    public productDataSorce: MatTableDataSource<Product> = null;
    public discountDataSorce: MatTableDataSource<Discount> = null;
    public products: Product[] = [];
    public discounts: Discount[] = [];
    public showFilter = false;
    public showRemoved = false;
    public currentTabPosition = 0;
    public photoDir = '';
    ngOnInit() {
        this.loadProducts();
        this.loadDiscounts();
        this.userService.notifyMenu('Услуги');
    }
    // tslint:disable-next-line:member-ordering
    @ViewChild('paginatorProducts') paginatorProducts: MatPaginator;
    // tslint:disable-next-line:member-ordering
    @ViewChild('sortProducts') sortProducts: MatSort;
    // tslint:disable-next-line:member-ordering
    @ViewChild('paginatorDiscounts') paginatorDiscounts: MatPaginator;
    // tslint:disable-next-line:member-ordering
    @ViewChild('sortDiscounts') sortDiscounts: MatSort;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private userService: UserService,
        public config: AppConfig) {
        this.photoDir = this.config.photoUrl + localStorage.getItem('userHash') + '/';
    }
    generateProductPhotoUrl(product: Product) {
        return product.hasPhoto ? this.photoDir + product.id + '_p.jpg' : this.config.defaultPhoto;
    }
    /**
     * Load client product list and init data source
     */
    loadProducts() {
        this.userService.getProducts().subscribe(
            data => {
                this.products = data.json().products;
                // this.productDataSorce = new MatTableDataSource(this.products);
                this.initProductSourceTable();
            },
            error => {
                this.userService.responseErrorHandle(error);
            }
        );
    }
    /**
     * Init paginator and sort for discount data source
     */
    private initDiscountSourceTable() {
        if (this.discountDataSorce != null) {
            this.discountDataSorce.paginator = this.paginatorDiscounts;
            this.discountDataSorce.sort = this.sortDiscounts;
        }
    }
    /**
     * Init paginator and sort for discount data source
     */
    private initProductSourceTable() {
        const products = this.products.filter(p => p.isRemoved === this.showRemoved);
        this.productDataSorce = new MatTableDataSource(products);
        if (this.productDataSorce != null) {
            this.productDataSorce.paginator = this.paginatorProducts;
            this.productDataSorce.sort = this.sortProducts;
        }
    }
    /**
     * Loading user discounts and create data source
     */
    private loadDiscounts() {
        this.userService.getDiscounts().subscribe(
            data => {
                this.discounts = data.json().discounts;
                this.discountDataSorce = new MatTableDataSource(this.discounts);
                this.initDiscountSourceTable();
            },
            error => {
                this.userService.responseErrorHandle(error);
            }
        );
    }
    /**
     * Needs to know which tab is current
     * @param tabChangeEvent
     */
    selectedTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.currentTabPosition = tabChangeEvent.index;
    }
    /**
     * Show or hide filter card
     */
    showHideFilter() {
        this.showFilter = !this.showFilter;
    }
    showHideRemoved() {
        this.showRemoved = !this.showRemoved;
        this.initProductSourceTable();
    }
    /**
     * Applay filter for selected tab
     * @param filterValue
     */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        if (this.currentTabPosition === 0) {
            this.productDataSorce.filter = filterValue;
        }
        if (this.currentTabPosition === 1) {
            this.discountDataSorce.filter = filterValue;
        }

    }
    photoClick(product: Product) {
        if (!product.hasPhoto) {
            return;
        }
        const dialogRef = this.dialog.open(MessagePreviewComponent, {
            // width: '250px',
            data: {
                title: product.name,
                src: this.generateProductPhotoUrl(product),
                mode: 'image'
            }
        });
    }
    /**
     * Delete product
     * @param productId Product id
     */
    deleteProduct(product: Product) {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            data: {
              title: 'Подтвердите',
              text: 'Удалить ' + product.name + ' цена ' + product.price  + '?',
             }
         });
         dialogRef.afterClosed().subscribe(result => {
           if (result === 1) {
             this.userService.removeProduct(product.id).subscribe(
               data => {
                 const index: number = this.products.indexOf(product);
                 if (index !== -1) {
                   this.products.splice(index, 1);
                   this.initProductSourceTable();
                 }
                 this.snackBar.open(data.json().message, 'Закрыть', {
                   duration: 2000,
                 });
               },
               error => {
                this.userService.responseErrorHandle(error);
               }
             );
           }
         });
    }
    /**
     * Open modal dialog for creating new discount or product
     */
    openDialog(): void {
        // 1 - discount tab index
        if (this.currentTabPosition === 1) {
            const dialogRef = this.dialog.open(DiscountModalComponent, {
                maxWidth: '310px',
                width: 'auto'
            });
            // Waiting closing discount modal dialog
            dialogRef.afterClosed().subscribe(result => {
                if (result.id !== 0) {
                    result.percent /= 100;
                    this.discountDataSorce.data.push(result);
                    this.initDiscountSourceTable();
                }
            });
        } else { // 0 - product tab index
            const dialogRef = this.dialog.open(ProductModalComponent, {
                minWidth: '310px',
                width: 'auto'
            });
            // Waiting closing product modal dialog
            dialogRef.afterClosed().subscribe(result => {
                if (result !== 0) {
                    if (result.id !== 0) {
                        this.productDataSorce.data.push(result);
                        this.initProductSourceTable();
                    }
                }
            });
        }
    }

    openEditProductDialog(selectedProduct: Product): void {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            minWidth: '310px',
            width: 'auto',
            data: { product: selectedProduct }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.id !== 0) {
                this.productDataSorce.data.push(result);
            }
        });
    }

    openEditDiscountDialog(selectedDiscount: Discount): void {
        const dialogRef = this.dialog.open(DiscountModalComponent, {
            maxWidth: '310px',
            width: 'auto',
            data: { discount: selectedDiscount }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadDiscounts();
            }
        });
    }
    /**
     * Open dialog for uploading new product photo
     */
    openPhotoDialog(product: Product) {
        const dialogRef = this.dialog.open(PhotoModalComponent, {
            data: {
                productId: product.id,
                type: 'product'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== 0) {
                product.hasPhoto = true;
            }
        });
    }
}
