
import { Component, ViewChild, Inject, OnInit } from '@angular/core';
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

export class ClientComponent implements OnInit {
    public client: Client = new Client();
    public orders: Orders = new Orders();
    public photo = '';
    constructor(
        public config: AppConfig,
        public snackBar: MatSnackBar,
        public orderDialog: MatDialog,
        public photoDialog: MatDialog,
        private clientService: ClientService,
        private userService: UserService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.orders.current = [];
        this.orders.old = [];
        this.route.params.subscribe(params => {
            this.loadClientInfo(params['id']);
            this.loadClientHistory(params['id']);
        });
        this.userService.notifyMenu('Клиент');
    }
    /**
     * Load client data by id
     * @param id client id
     */
    loadClientInfo(id: number) {
        this.clientService.get(id).subscribe(
            data => {
                this.client = data.json().client;
                // concat photo url
                this.photo = this.config.photoUrl + localStorage.getItem('userHash') + '/' + this.client.id + '.jpg';
            },
            error => {
                this.snackBar.open('Ошибка загрузки данных.', 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }
    /**
     * Load client order history
     * @param id client id
     */
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
    /**
     * Open new order dialog
     */
    openNewOrderDialog() {
        const dialogRef = this.orderDialog.open(OrderModalComponent, {
            data: {
                client: this.client,
                order: null
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadClientHistory(this.client.id);
            }
        });
    }
    /**
     * Open order dialog for editing data
     * @param order client order
     */
    openEditOrderDialog(order: Order) {
        const dialogRef = this.orderDialog.open(OrderModalComponent, {
            data: { client: this.client, order: order }

        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                this.loadClientHistory(this.client.id);
            }
        });
    }
    /**
     * Mark order as removed
     * @param order Order
     */
    removeOrder(order: Order) {
        this.userService.removeOrder(order.id).subscribe(
            data => {
                order.removed = true;
            },
            error => {
                this.snackBar.open('Ошибка.', 'Закрыть', {
                    duration: 2000,
                });
            }
        );
    }
    /**
     * Open dialog for uploading new client photo
     */
    openPhotoDialog() {
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
