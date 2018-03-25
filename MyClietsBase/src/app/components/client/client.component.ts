
import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { ClientModalComponent } from '../modals/client/client.component';
import { Client, Order } from '../../models/index';
import { ClientService } from '../../services/index';
import { OrderModalComponent } from '../modals/order/order.component';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client',
    styleUrls: ['./client.component.css'],
    templateUrl: './client.component.html',
})

export class ClientComponent {
    client: Client = new Client();
    orders: Order[] = null;
    name: string;
    constructor(
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
         private clientService: ClientService,
         private route: ActivatedRoute) {
             this.route.params.subscribe( params => {
                 this.loadClientInfo(params['id']);
                 this.loadClientHistory(params['id']);
                });
    }
    loadClientInfo(id: number) {
        this.clientService.get(id).subscribe(
            data => {
                this.client = data.json().client;
            },
            error => {
                this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }
    loadClientHistory(id: number) {
        this.clientService.getOrders(id).subscribe(
            data => {
                this.orders = data.json().orders;
            },
            error => {
                this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
                    duration: 2000,
                  });
            }
        );
    }
    addOrder() {
        const dialogRef = this.dialog.open(OrderModalComponent, {
            data : {client: this.client}
        });
    }
}
