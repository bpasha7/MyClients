import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { User, Product, Order, Discount, Outgoing } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './app.service';
import { HttpHeaders, HttpRequest, HttpClient } from '@angular/common/http';

/**
 * Сервис для работы с контроллером Users
 */
@Injectable()
export class UserService extends AppService {
    constructor(
        private httpCleint: HttpClient,
        private http: Http,
        public config: AppConfig,
        public router: Router) {
        super(router);
        this.controller = '/users';
    }
    //#region User accont manipulations
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
        this.notifyMenu('1');
    }
    getUserInfo() {
        return this.http.get(this.config.apiUrl + this.controller, this.jwt());
    }
    register(user: User) {
        return this.http.post(this.config.apiUrl + this.controller + '/register', user);
    }
    //#endregion
    /**
     * Logout - clear local storage
     */
    logout() {
        localStorage.clear();
        this.notifyMenu('0');
    }
    //#region Products api methods
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
     * Upload user product photo
     * @param productId product id
     * @param form form date with file
     */
    uploadProductPhoto(productId: number, form: FormData) {
        const req = new HttpRequest('POST',
            this.config.apiUrl + this.controller + '/product/' + productId + '/photo',
            form,
            {
                reportProgress: true,
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
                })
            });
        return this.httpCleint.request(req);
    }
    //#endregion
    //#region Discount api methods
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
    //#endregion
    //#region Outgoings api methods
    /**
     * Create user outgoing
     * @param outgoing
     */
    createOutgoing(outgoing: Outgoing) {
        return this.http.post(this.config.apiUrl + this.controller + '/outgoing', outgoing, this.jwt());
    }
    /**
     * Update user outgoing
     * @param outgoing
     */
    updateOutgoing(outgoing: Outgoing) {
        return this.http.put(this.config.apiUrl + this.controller + '/outgoing', outgoing, this.jwt());
    }
    /**
     * Delete user outgoing
     * @param outgoingId outgoing id
     */
    deleteOutgoing(outgoingId: number) {
        return this.http.delete(this.config.apiUrl + this.controller + '/outgoing/' + outgoingId, this.jwt());
    }
    //#endregion
    //#region Orders api methods
    /**
     * Create user order
     * @param order new order
     */
    createOrder(order: Order) {
        return this.http.post(this.config.apiUrl + this.controller + '/order', order, this.jwt());
    }
    /**
     * Update existed order
     * @param order Edited order
     */
    updateOrder(order: Order) {
        return this.http.put(this.config.apiUrl + this.controller + '/order', order, this.jwt());
    }
    /**
     * Change order status
     * @param id
     */
    changeStatus(id: number) {
        return this.http.patch(this.config.apiUrl + this.controller + '/order/' + id, null, this.jwt());
    }
    /**
     * Get user current orders
     */
    getCurrentOrders() {
        return this.http.get(this.config.apiUrl + this.controller + '/orders/current', this.jwt());
    }
    //#endregion
    //#region Reports api methods
    /**
     * Get user statictics report by dates
     * @param begin date begin report
     * @param end date end report
     */
    getReport(begin: Date, end: Date) {
        return this.http.get(
            this.config.apiUrl + this.controller + '/report?begin=' +
            begin.toDateString() + '&end=' + end.toDateString(), this.jwt());
    }
    /**
     * Get user outgoings report by dates
     * @param begin date begin report
     * @param end date end report
     */
    getOutgoings(begin: Date, end: Date) {
        return this.http.get(this.config.apiUrl + this.controller + '/outgoings/report?begin=' +
            begin.toDateString() + '&end=' + end.toDateString(), this.jwt());
    }
    //#endregion
    //#region Messages api methods
    /**
     * Get  user messages
     */
    getMessages() {
        return this.http.get(this.config.apiUrl + this.controller + '/messages', this.jwt());
    }
    /**
     * Get count unread user messages
     */
    getUnreadCount() {
        return this.http.get(this.config.apiUrl + this.controller + '/messages/unread', this.jwt());
    }
    /**
     * Mark as read user message
     * @param id message id
     */
    readMessage(id: number) {
        return this.http.patch(this.config.apiUrl + this.controller + '/message/' + id, null, this.jwt());
    }
    //#endregion
}
