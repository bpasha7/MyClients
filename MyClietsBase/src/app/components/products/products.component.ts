import { Component, ViewChild, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl, MatTabChangeEvent } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product, Discount } from '../../models/index';
import { UserService } from '../../services/index';
import { ProductModalComponent, DiscountModalComponent } from '../modals';

@Component({
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
    public showFilter: boolean = false;
    public currentTabPosition: number = 0;
    ngOnInit() {

    }
    // tslint:disable-next-line:member-ordering
    @ViewChild(MatPaginator) paginatorProducts: MatPaginator;
    // tslint:disable-next-line:member-ordering
    @ViewChild(MatSort) sortProducts: MatSort;
    // tslint:disable-next-line:member-ordering
    @ViewChild(MatPaginator) paginatorDiscounts: MatPaginator;
    // tslint:disable-next-line:member-ordering
    //@ViewChild(MatSort) sortDiscounts: MatSort;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private userService: UserService) {
        this.loadProducts();
        this.loadDiscounts();
    }


    loadProducts() {
        this.userService.getProducts().subscribe(
            data => {
                this.products = data.json().products;
                this.productDataSorce = new MatTableDataSource(this.products);
                if (this.productDataSorce != null) {
                    this.productDataSorce.paginator = this.paginatorProducts;
                    //this.productDataSorce.sort = this.sortProducts;
                }
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
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
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
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
    /**
     * Open modal dialog for creating new discount or product
     */
    openDialog(): void {
        // 1 - discount tab index
        if (this.currentTabPosition === 1) {
            const dialogRef = this.dialog.open(DiscountModalComponent, {
            });
            // Waiting closing discount modal dialog
            dialogRef.afterClosed().subscribe(result => {
                if (result.id !== 0) {
                    result.percent /= 100;
                    this.discountDataSorce.data.push(result);
                    this.initDiscountSourceTable();
                    //this.loadDiscounts();
                }
            });
        } else { // 0 - product tab index
            const dialogRef = this.dialog.open(ProductModalComponent, {
            });
            // Waiting closing product modal dialog
            dialogRef.afterClosed().subscribe(result => {
                if (result === 1) {
                    this.loadProducts();
                }
            });
        }
    }

    openEditProductDialog(selectedProduct: Product): void {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            data: { product: selectedProduct }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.id !== 0) {
                this.discountDataSorce.data.push(result);

                //this.loadProducts();
            }
        });
    }

    openEditDiscountDialog(selectedDiscount: Discount): void {
        const dialogRef = this.dialog.open(DiscountModalComponent, {
            data: { discount: selectedDiscount }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadDiscounts();
            }
        });
    }
}
