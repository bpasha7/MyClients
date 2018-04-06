
import { Component, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Client, Order, Orders } from '../../models/index';
import { ClientService, UserService } from '../../services/index';
import { OrderModalComponent, PhotoModalComponent, ClientModalComponent } from '../modals/index';
import { AppConfig } from '../../app.config';
@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client',
    styleUrls: ['./client.component.css'],
    templateUrl: './client.component.html',
})

export class ClientComponent {
    client: Client = new Client();
    orders: Orders = new Orders();
    photo: string = '';
    name: string;
    constructor(
        public config: AppConfig,
        public snackBar: MatSnackBar,
        public orderDialog: MatDialog,
        public photoDialog: MatDialog,
        private clientService: ClientService,
        private userService: UserService,
        private route: ActivatedRoute) {
        this.orders.current = [];
        this.orders.old = [];
        this.route.params.subscribe(params => {
            this.loadClientInfo(params['id']);
            this.loadClientHistory(params['id']);
        });
    }
    loadClientInfo(id: number) {
        this.clientService.get(id).subscribe(
            data => {
                this.client = data.json().client;
                this.photo = this.config.photoUrl+'671EF4298BF7FDA73A2EA72F963BF7EF'+'/'+this.client.id+'.jpg';
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
                this.orders = data.json();
            },
            error => {
                this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }
    addOrder() {
        const dialogRef = this.orderDialog.open(OrderModalComponent, {
            data: { client: this.client, order: null }

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadClientHistory(this.client.id);
            }
        });
    }

    editOrder(order: Order) {
        const dialogRef = this.orderDialog.open(OrderModalComponent, {
            data: { client: this.client, order: order }

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadClientHistory(this.client.id);
            }
        });
    }

    removeOrder(order: Order) {
        this.userService.removeOrder(order.id).subscribe(
            data => {
                order.removed = true;
               //let selectedOrder: Order= this.orders.find(p=>p.id=== this.order.productId);
                //this.orders = data.json();
            },
            error => {
                this.snackBar.open('Ошибка.', 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }

    addPhoto(){
        const dialogRef = this.photoDialog.open(PhotoModalComponent, {
            data: { clientId: this.client.id }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 0) {
                this.photo = '';
                this.photo = this.photo;
            }
        });
    }

    editProfile() {
        const dialogRef = this.photoDialog.open(ClientModalComponent, {
            data: { client: this.client }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 0) {

            }
        });
    }
}
