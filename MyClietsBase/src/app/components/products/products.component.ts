import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../models/index';
import { UserService } from '../../services/index';
import { ProductModalComponent } from '../modals';

@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    [x: string]: any;
    displayedColumns = ['name', 'price'];
    dataSource: MatTableDataSource<Product> = null;
    products: Product[] = [];
    ngOnInit() {
        
    }
    // tslint:disable-next-line:member-ordering
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // tslint:disable-next-line:member-ordering
    @ViewChild(MatSort) sort: MatSort;
    constructor(public dialog: MatDialog, private userService: UserService) {
        this.loadProducts();
    }


    loadProducts() {
        this.userService.getProducts(1).subscribe(
            data => {
                this.products = data.json().products;
                // this.resultsLength = this.clients.length;
                this.dataSource = new MatTableDataSource(this.products);
                this.ngAfterViewInit();
            },
            error => {
                console.error(error._body);
            }
        );
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngAfterViewInit() {
        if (this.dataSource != null) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
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
            data : {product: selectedProduct}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadProducts();
            }
        });
    }

}
