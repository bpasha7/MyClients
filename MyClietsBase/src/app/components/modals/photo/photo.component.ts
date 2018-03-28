import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Product } from '../../../models/index';
import { ClientService } from '../../../services/index';
import { error } from 'util';
import { HttpEventType, HttpResponse} from '@angular/common/http';
@Component({
    selector: 'photo-dialog',
    styleUrls: ['./photo.component.css'],
    templateUrl: './photo.component.html',
})

export class PhotoModalComponent {
        public src = null;
        private file;
        public progress = 0;
        public title: string;
    constructor(
        public snackBar: MatSnackBar,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<PhotoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            // if (data == null) {
            //     this.product = new Product();
            //     this.title = 'Новая услуга';
            // } else {
            //     this.product = data.product;
            //     this.title = 'Обновление';
            // }
    }

    create() {
        // this.userService.createProduct(1, this.product).subscribe(
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

    upload(event) {
        // if (file == null)
        //     return;
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        if (event.target.files && event.target.files[0]) {
            // tslint:disable-next-line:prefer-const
            let reader = new FileReader();
            this.file = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]); // read file as data url

            reader.onload = (event: FileReaderEvent) => { // called once readAsDataURL is completed
                this.src = event.target.result;
            }
          }

    }

    update() {
        const formData = new FormData();
        formData.append(this.file.name, this.file);

        this.clientService.uploadPhoto(1, formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                console.log('Files uploaded!');
                }
        });
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}
