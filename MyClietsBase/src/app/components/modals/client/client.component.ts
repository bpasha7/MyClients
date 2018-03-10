import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../models/index';
import { ClientService } from '../../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
import { error } from 'util';
@Component({
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
            this.client = new Client();
            this.client.birthday = new Date(1990, 0, 1);
    }

    create(){
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
        )
    }
    onNoClick(): void {
        this.dialogRef.close();
    }


    // test(){
    //     this.http.get('http://localhost:4201/api/values').subscribe(
    //         data => {
    //             var res = data.json().message
    //         }
    // );
    // }
}