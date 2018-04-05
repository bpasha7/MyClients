import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
@Component({
    selector: 'discount-dialog',
    styleUrls: ['./discount.component.css'],
    templateUrl: './discount.component.html',
})

export class DiscountModalComponent {
    public discount: Discount;
    public title: string;
    constructor(
        public snackBar: MatSnackBar,
        private userService: UserService,
        public dialogRef: MatDialogRef<DiscountModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data == null) {
                this.discount = new Discount();
                this.title = 'Новая услуга';
            } else {
                this.discount = data.discount;
                this.title = 'Обновление';
            }
    }

    create() {
        // this.userService.createProduct(1, this.discount).subscribe(
        //     data => {
        //         this.snackBar.open('Услуга добавлена.', 'Закрыть', {
        //             duration: 2000,
        //           });
        //     },
        //     error => {
        //         this.snackBar.open(error._body, 'Закрыть', {
        //             duration: 2000,
        //           });
        //     }
        // );
    }

    update() {

    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}
