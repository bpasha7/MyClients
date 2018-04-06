import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../models/index';
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
            if (data == null) {
                this.client = new Client();
                this.client.birthday = new Date(1990, 0, 1);
            } else {
                this.client = data.client;
            }
    }

    create() {
        this.client.birthday.setHours(-this.client.birthday.getTimezoneOffset() / 60 );
        this.clientService.create(this.client).subscribe(
            data => {
                this.snackBar.open('Клиент добавлен.', 'Закрыть', {
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
        this.dialogRef.close();
    }
}
