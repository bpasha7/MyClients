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
                this.discount.id = 0;
                this.title = 'Новая скидка';
            } else {
                this.discount = data.discount;
                this.discount.percent *= 100;
                this.title = 'Обновление';
            }
    }

    create() {
        this.userService.createDiscount(this.discount).subscribe(
            data => {
                this.discount.id = data.json().discountId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(this.discount);
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }

    update() {
        this.userService.updateDiscount(this.discount).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                  });
                  return 1;
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                  });
                  return 0;
            }
        );
    }
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}
