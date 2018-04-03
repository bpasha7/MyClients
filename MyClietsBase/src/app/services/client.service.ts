import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { Client } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpRequest } from 'selenium-webdriver/http';

/**
 * Client Service
 */
@Injectable()
export class ClientService {
    /**
     * Rest controller
     */
    private controller: string = '/clients';
    constructor(
        private http: Http,
        private httpCleint: HttpClient,
        public config: AppConfig,
        private router: Router) { }
    /**
     * Creating new client
     * @param client Client
     */
    create(client: Client) {
        // let headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        return this.http.post(this.config.apiUrl + this.controller + '/create', client);//, options);
    }
    getAll() {
        return this.http.get(this.config.apiUrl + this.controller);
    }
    get(clientId: number) {
        return this.http.get(this.config.apiUrl + this.controller + '/' + clientId);
    }

    getOrders(clientId: number) {
        return this.http.get(this.config.apiUrl + this.controller + '/' + clientId + '/orders');
    }

    uploadPhoto(clientId: number, form: FormData) { 
        let req = new HttpRequest('POST', 
        this.config.apiUrl + this.controller + '/' + clientId + '/photo', 
        form,
        {
            reportProgress: true,
            headers: new HttpHeaders({
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QiLCJuYW1laWQiOiIxIiwibmJmIjoxNTIyNzM0MDE0LCJleHAiOjE1MjUzMjYwMTQsImlhdCI6MTUyMjczNDAxNH0.ngZxp3bif9Nqu3YO2e-f6MesjKxYMKB5JL1gCB-Hpkg'
            })
        });
        //req.headers = 
        return this.httpCleint.request(req);
    }

    /**
     * create authorization header with jwt token
     */
    private jwt() {
        // let headers = new Headers({ 'Authorization': 'Bearer ' + '345' });
        // return new RequestOptions({ headers: headers });
        
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser && currentUser.token) {
             let headers = new Headers({ 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QiLCJuYW1laWQiOiIxIiwibmJmIjoxNTIyNzM0MDE0LCJleHAiOjE1MjUzMjYwMTQsImlhdCI6MTUyMjczNDAxNH0.ngZxp3bif9Nqu3YO2e-f6MesjKxYMKB5JL1gCB-Hpkg' });
             return new RequestOptions({ headers: headers });
        // }
    }
}