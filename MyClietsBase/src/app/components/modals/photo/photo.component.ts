import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Product } from '../../../models/index';
import { ClientService } from '../../../services/index';
import { error } from 'util';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
    selector: 'photo-dialog',
    styleUrls: ['./photo.component.css'],
    templateUrl: './photo.component.html',
})

export class PhotoModalComponent {
    public src = null;
    private file;
    public progress = 0;
    private clientId = 0;
    public title: string;
    constructor(
        public snackBar: MatSnackBar,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<PhotoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.clientId = data.clientId;
        }
    }

    upload(event) {
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

        this.clientService.uploadPhoto(this.clientId, formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                if(event.status == 200) {
                    this.snackBar.open('Фото обновлено', 'Закрыть', {
                        duration: 2000,
                    });
                    this.progress = 0;
                    setTimeout(()=>{ this.dialogRef.close(this.src); }, 2000)
                    
                } else {
                    this.snackBar.open('Ошибка загрузки', 'Закрыть', {
                        duration: 2000,
                    });
                }
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
