
import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client } from '../../models/index';
import { ClientService } from '../../services/index';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client',
    styleUrls: ['./client.component.css'],
    templateUrl: './client.component.html',
})

export class ClientComponent {
    client: Client = null;
    name: string;
    constructor(public dialog: MatDialog,
         private clientService: ClientService,
         private route: ActivatedRoute) {
             //this.name = 
             this.route.params.subscribe( params => console.log(params) );
        // clientService.get().subscribe(
        //     data => {
        //         this.client = data.json().client;
        //     },
        //     error => {
        //         console.error(error._body);
        //     }
        // );
    }
}
