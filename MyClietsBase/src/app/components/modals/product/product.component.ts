import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
@Component({
    selector: 'product-dialog',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html',
})

export class ProductModalComponent {
    public product: Product;
    public title: string;
    constructor(
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<ProductModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data == null) {
                this.product = new Product();
                this.title = 'Новая услуга';
            } else {
                this.product = data.product;
                this.title = 'Обновление';
            }
    }

    create() {
        this.userService.createProduct(1, this.product).subscribe(
            data => {
                this.snackBar.open('Услуга добавлена.', 'Закрыть', {
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

    update() {

    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}
