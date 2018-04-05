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
    @ViewChild(MatSort) sortDiscounts: MatSort;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        private userService: UserService) {
        this.loadProducts();
        this.loadDiscounts();
    }


    loadProducts() {
        this.userService.getProducts(1).subscribe(
            data => {
                this.products = data.json().products;
                this.productDataSorce = new MatTableDataSource(this.products);
                if (this.productDataSorce != null) {
                    this.productDataSorce.paginator = this.paginatorProducts;
                    this.productDataSorce.sort = this.sortProducts;
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
                this.discountDataSorce = new MatTableDataSource(this.discounts);
                if (this.discountDataSorce != null) {
                    this.discountDataSorce.paginator = this.paginatorDiscounts;
                    this.discountDataSorce.sort = this.sortDiscounts;
                }
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }

    selectedTabChange(tabChangeEvent: MatTabChangeEvent) {
        this.currentTabPosition = tabChangeEvent.index;
    }
    /**
     * Show or hide filter card
     */
    showHideFilter() {
        this.showFilter = ! this.showFilter;
    }
    /**
     * Applay filter for current data sorce
     * @param filterValue 
     */
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        if(this.currentTabPosition === 0) {
            this.productDataSorce.filter = filterValue;
        }
        if(this.currentTabPosition === 1) {
            this.discountDataSorce.filter = filterValue;
        }
        
    }

    openDialog(): void {
        
        const dialogRef = this.dialog.open(ProductModalComponent, {
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadProducts();
            }
        });
    }

    openEditDialog(selectedProduct: Product): void {
        const dialogRef = this.dialog.open(ProductModalComponent, {
            data: { product: selectedProduct }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadProducts();
            }
        });
    }

}
