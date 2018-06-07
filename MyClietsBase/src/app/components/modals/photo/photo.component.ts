import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { Product } from '../../../models/index';
import { ClientService, UserService } from '../../../services/index';
import { error } from 'util';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'photo-dialog',
    styleUrls: ['./photo.component.css'],
    templateUrl: './photo.component.html',
})

export class PhotoModalComponent {
    public src = null;
    private file;
    public progress = 0;
    private id = 0;
    private type = '';
    public title: string;
    constructor(
        public snackBar: MatSnackBar,
        private clientService: ClientService,
        private userService: UserService,
        public dialogRef: MatDialogRef<PhotoModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data != null) {
            this.type = data.type;
            switch (this.type) {
                case 'client' :  this.id = data.clientId; break;
                case 'product' :  this.id = data.productId; break;
            }
        }
    }

    upload(event) {
        if (event.target.files && event.target.files[0]) {
            // tslint:disable-next-line:prefer-const
            let reader = new FileReader();
            this.file = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]); // read file as data url

            // tslint:disable-next-line:no-shadowed-variable
            reader.onload = (event: FileReaderEvent) => { // called once readAsDataURL is completed
                this.src = event.target.result;
            };
        }
    }

    update() {
        const formData = new FormData();
        formData.append(this.file.name, this.file);
        switch (this.type) {
            case 'client' :  this.updateClientPhoto(formData); break;
            case 'product' :  this.updateProductPhoto(formData); break;
            case 'user' :  this.updateAvatarPhoto(formData); break;
        }
    }

    updateClientPhoto(formData: FormData) {
        this.clientService.uploadPhoto(this.id, formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                if (event.status === 200) {
                    this.snackBar.open('Фото обновлено', 'Закрыть', {
                        duration: 2000,
                    });
                    this.progress = 0;
                    setTimeout(() => {
                        this.dialogRef.close(this.src);
                    }, 2000);
                } else {
                    this.snackBar.open('Ошибка загрузки', 'Закрыть', {
                        duration: 2000,
                    });
                }
            }
        });
    }

    updateProductPhoto(formData: FormData) {
        this.userService.uploadProductPhoto(this.id, formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                if (event.status === 200) {
                    this.snackBar.open('Фото обновлено', 'Закрыть', {
                        duration: 2000,
                    });
                    this.progress = 0;
                    setTimeout(() => {
                        this.dialogRef.close(this.src);
                    }, 2000);
                } else {
                    this.snackBar.open('Ошибка загрузки', 'Закрыть', {
                        duration: 2000,
                    });
                }
            }
        });
    }

    updateAvatarPhoto(formData: FormData) {
        this.userService.uploadAvatarPhoto(formData).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
                if (event.status === 200) {
                    this.snackBar.open('Фото обновлено', 'Закрыть', {
                        duration: 2000,
                    });
                    this.progress = 0;
                    setTimeout(() => {
                        this.dialogRef.close(this.src);
                    }, 2000);
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
