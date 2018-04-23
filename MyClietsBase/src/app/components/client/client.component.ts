
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
    public currentNotCanceled = 0;
    public oldNotCanceled = 0;
    public photo = '';
    public today: Date;
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
        const now = new Date();
        this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        this.orders.current = [];
        this.orders.old = [];
        this.route.params.subscribe(params => {
            this.loadClientInfo(params['id']);
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
                this.orders = data.json().orders;
                this.filterOrders();
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
     * Split orders by date
     */
    filterOrders() {
        this.oldNotCanceled = this.countOrders(this.orders.old);
        this.currentNotCanceled = this.countOrders(this.orders.current);
    }
    /**
     * Sort part of orders by date desc
     * @param orders 
     */
    sort(orders: Order[]) {
        orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    /**
     * Count not canceled orders
     * @param orders order list
     */
    countOrders(orders: Order[]) {
        let count: number = 0;
        orders.forEach(order => {
          if (!order.removed) 
            count++;
        });
        return count;
    }
    /**
     * Open new order dialog
     */
    openNewOrderDialog() {
        let newOrder: Order = new Order();
        newOrder.id = 0;
        newOrder.clientId = this.client.id;
        const dialogRef = this.orderDialog.open(OrderModalComponent, {
            data: {
                order: newOrder
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === 1) {
                //newOrder.id = result.id;
                newOrder.date.setHours(newOrder.date.getHours() + newOrder.date.getTimezoneOffset() / 60);
                if(newOrder.date > this.today) { 
                    this.orders.current.push(newOrder);  
                    this.sort(this.orders.current);       
                }
                else {
                    this.orders.old.push(newOrder);
                    this.sort(this.orders.old);  
                }
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
                //this.loadClientHistory(this.client.id);
            }
        });
    }
    /**
     * change order status
     * @param order Order
     */
    changeStatus(order: Order) {
        this.userService.changeStatus(order.id).subscribe(
            data => {
                order.removed = !order.removed;
                this.filterOrders();                
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

