import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from 'util';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'confirmation-dialog',
    styleUrls: ['./confirmation.component.css'],
    templateUrl: './confirmation.component.html',
})

export class ConfirmationComponent {
    public title: string;
    public text: string;
    constructor(
        public dialogRef: MatDialogRef<ConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.text = data.text;
            this.title = data.title;
        }
    }
}
