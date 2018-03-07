import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client } from '../../models/index';
import { ClientService } from '../../services/index';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
@Component({
    selector: 'clients',
    styleUrls: ['./clients.component.css'],
    templateUrl: './clients.component.html',
})

export class ClientsComponent {
    private client: Client;
    constructor(private http: Http, public dialog: MatDialog, private clientService: ClientService) {
        this.client = new Client();
    }

    create(){
        this.clientService.create(this.client).subscribe(
            data => {
                console.info("OK");
            },
            error => {
                console.error(error._body);
            }
        )
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(ClientModalComponent, {
        //   width: '250px'//,
        data: {client: this.client }
         //  client: this.client
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     if(result == 1)
        //     this.create();
        // })
    }

   

   /* test(){
        this.http.get('http://localhost:4201/api/values').subscribe(
            data => {
                var res = data.json().message
            }
    );
    }*/
}
