import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { User, Product, Order, Discount, Outgoing } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';

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
    /**
     * Authenticate user
     * @param user 
     */
    login(user: User) {
        return this.http.post(this.config.apiUrl + this.controller + '/authenticate', user);
    }
    /**
     * Set data to local storage
     * @param token 
     * @param hash 
     */
    setToken(token: string, hash: string) {
        localStorage.setItem('currentUser', token);
        localStorage.setItem('userHash', hash);
    }
    /**
     * Logout - clear local storage
     */
    logout() {
        localStorage.clear();
    }
    /**
     * Get user product list
     */
    getProducts() {
        return this.http.get(this.config.apiUrl + this.controller + '/products', this.jwt());
    }
    /**
     * Create user product
     * @param product 
     */
    createProduct(product: Product) {
        return this.http.post(this.config.apiUrl + this.controller + '/product', product, this.jwt());
    }
    /**
     * Update user product
     * @param product 
     */
    updateProduct(product: Product) {
        return this.http.put(this.config.apiUrl + this.controller + '/product', product, this.jwt());
    }
    /**
     * Get user discount list
     */
    getDiscounts() {
        return this.http.get(this.config.apiUrl + this.controller + '/discounts', this.jwt());
    }
    /**
     * Create user discount
     * @param discount 
     */
    createDiscount(discount: Discount) {
        return this.http.post(this.config.apiUrl + this.controller + '/discount', discount, this.jwt());
    }
    /**
     * Update user discount
     * @param discount
     */
    updateDiscount(discount: Discount) {
        return this.http.put(this.config.apiUrl + this.controller + '/discount', discount, this.jwt());
    }
    /**
     * Create user order
     * @param order
     */
    createOrder(order: Order) {
        return this.http.post(this.config.apiUrl + this.controller + '/order', order, this.jwt());
    }
    /**
     * Create user outgoing
     * @param outgoing
     */
    createOutgoing(outgoing: Outgoing) {
        return this.http.post(this.config.apiUrl + this.controller + '/outgoing', outgoing, this.jwt());
    }
    /**
     * Mark as removed user order
     * @param id 
     */
    removeOrder(id: number) {
        return this.http.patch(this.config.apiUrl + this.controller + '/order/' + id, null, this.jwt());
    }
    /**
     * Get current user orders 
     */
    getCurrentOrders() {
        return this.http.get(this.config.apiUrl + this.controller + '/orders/current', this.jwt());
    }
    /**
     * Get user report by dates
     * @param begin date begin report
     * @param end date end report
     */
    getReport(begin: Date, end: Date) {
        return this.http.get(
            this.config.apiUrl + this.controller + '/report?begin=' +
            begin.toDateString() + '&end=' + end.toDateString(), this.jwt());
    }

    getOutgoings(begin: Date, end: Date) {
        return this.http.get(this.config.apiUrl + this.controller + '/outgoings/report?begin=' +
        begin.toDateString() + '&end=' + end.toDateString(), this.jwt());
    }

    getMessages() {
        return this.http.get(this.config.apiUrl + this.controller + '/messages', this.jwt());
    }

    readMessage(id: number) {
        return this.http.patch(this.config.apiUrl + this.controller + '/message/' + id, null, this.jwt());
    }
}
