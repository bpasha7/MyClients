import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from 'util';
@Component({
    selector: 'message-dialog',
    styleUrls: ['./messagePreview.component.css'],
    templateUrl: './messagePreview.component.html',
})

export class MessagePreviewComponent {
    public title: string;
    public text: string;
    constructor(
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<MessagePreviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data != null) {
                this.text = data.text;
                this.title = data.from;
            }
    }
}
