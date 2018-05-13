import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Discount } from '../../../models/index';
import { UserService } from '../../../services/index';
import { error } from 'util';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'discount-dialog',
    styleUrls: ['./discount.component.css'],
    templateUrl: './discount.component.html',
})

export class DiscountModalComponent {
    public discount: Discount;
    public title: string;
    public inProc = false;
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
        this.inProc = true;
        this.userService.createDiscount(this.discount).subscribe(
            data => {
                this.discount.id = data.json().discountId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(this.discount);
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.userService.responseErrorHandle(error);
            }
        );
    }

    update() {
        this.inProc = true;
        this.userService.updateDiscount(this.discount).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                  });
            },
            // tslint:disable-next-line:no-shadowed-variable
            error => {
                this.inProc = false;
                this.userService.responseErrorHandle(error);
            }
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
