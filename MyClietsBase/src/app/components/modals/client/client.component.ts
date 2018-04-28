import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client, Order } from '../../../models/index';
import { ClientService } from '../../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
import { error } from 'util';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client-dialog',
    styleUrls: ['./client.component.css'],
    templateUrl: './client.component.html',
})

export class ClientModalComponent {
    public client: Client;
    constructor(
        public snackBar: MatSnackBar,
        private clientService: ClientService,
        public dialogRef: MatDialogRef<ClientModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.client = data.client;
    }

    create() {
        this.client.birthday.setHours(-this.client.birthday.getTimezoneOffset() / 60);
        this.clientService.create(this.client).subscribe(
            data => {
                this.client.id = data.json().clientId;
                this.snackBar.open(data.json().message, 'Закрыть', {
                    duration: 2000,
                });
                this.dialogRef.close(this.client);
            },
            error => {
                this.snackBar.open(error._body, 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }

    update() {
        this.client.birthday = new Date(this.client.birthday);
        const offset = this.client.birthday.getTimezoneOffset();
        if (offset) {
            this.client.birthday.setHours(-offset / 60);
        }
        this.clientService.update(this.client).subscribe(
            data => {
                this.snackBar.open(data.json().message, 'Закрыть', {
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


    onNoClick(): void {
        this.dialogRef.close(this.client);
        //this.dialogRef.close();
    }
}
