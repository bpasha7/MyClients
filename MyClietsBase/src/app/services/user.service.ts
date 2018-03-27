import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { User, Product, Order } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Сервис для работы с контроллером Users
 */
@Injectable()
export class UserService {
    /**
     * Rest controller
     */
    private controller: string = '/users';
    constructor(private http: Http,
        public config: AppConfig,
        private router: Router) { }
    /**#toDo
     * Add create and login functions here
     */


    getProducts(userId: number) {
        return this.http.get(this.config.apiUrl + this.controller + '/' + userId + '/products', this.jwt());
    }

    getDiscounts(userId: number) {
        return this.http.get(this.config.apiUrl + this.controller + '/' + userId + '/discounts');
    }

    createProduct(userId: number, product: Product) {
        return this.http.post(this.config.apiUrl + this.controller + '/' + userId + '/product', product);
    }

    createOrder(userId: number, order: Order) {
        order.userId = 1;
        return this.http.post(this.config.apiUrl + this.controller + '/' + userId + '/order', order);
    }

    removeOrder(id: number){
        return this.http.patch(this.config.apiUrl + this.controller +'/order/' + id, null, this.jwt());
    }

    /**
     * create authorization header with jwt token
     */
    private jwt() {
       // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE1MjIxMzQ3NTEsImV4cCI6MTUyMjIyMTE1MSwiaWF0IjoxNTIyMTM0NzUxfQ.VUTlMMaxJmdY3hY8o89Fhvki5gpcXrY0_Grg0N5sigk' });
            return new RequestOptions({ headers: headers });
        //}
    }
}