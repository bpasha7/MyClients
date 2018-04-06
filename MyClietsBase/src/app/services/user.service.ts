import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { User, Product, Order, Discount } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service'

/**
 * Сервис для работы с контроллером Users
 */
@Injectable()
export class UserService extends AppService {
    constructor(private http: Http,
        public config: AppConfig,
        private router: Router) {
            super();
            this.controller = '/users';
         }
    /**#toDo
     * Add create and login functions here
     */

    getProducts() {
        return this.http.get(this.config.apiUrl + this.controller + '/products', this.jwt());
    }

    createProduct(product: Product) {
        return this.http.post(this.config.apiUrl + this.controller + '/product', product, this.jwt());
    }

    updateProduct(product: Product) {
        return this.http.put(this.config.apiUrl + this.controller + '/product', product, this.jwt());
    }

    getDiscounts() {
        return this.http.get(this.config.apiUrl + this.controller + '/discounts', this.jwt());
    }
    createDiscount(discount: Discount) {
        return this.http.post(this.config.apiUrl + this.controller + '/discount', discount, this.jwt());
    }

    updateDiscount(discount: Discount) {
        return this.http.put(this.config.apiUrl + this.controller + '/discount', discount, this.jwt());
    }

    createOrder(order: Order) {
        return this.http.post(this.config.apiUrl + this.controller + '/order', order, this.jwt());
    }

    removeOrder(id: number){
        return this.http.patch(this.config.apiUrl + this.controller +'/order/' + id, null, this.jwt());
    }

    getCurrentOrders() {
        return this.http.get(this.config.apiUrl + this.controller + '/orders/current', this.jwt());
    }
}