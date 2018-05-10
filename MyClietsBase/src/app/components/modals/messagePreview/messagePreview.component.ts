import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from 'util';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'message-dialog',
    styleUrls: ['./messagePreview.component.css'],
    templateUrl: './messagePreview.component.html',
})

export class MessagePreviewComponent {
    public title: string;
    public text: string;
    public imageSrc: string;
    public showImage = false;
    public showText = false;
    constructor(
        public snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<MessagePreviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if (data != null) {
                if (data.mode === 'message') {
                    this.text = data.text;
                    this.title = data.from;
                    this.showText = !this.showImage;
                }
                if (data.mode === 'image') {
                    this.title = data.title;
                    this.imageSrc = data.src;
                    this.showImage = !this.showText;
                }
            }
    }
}
