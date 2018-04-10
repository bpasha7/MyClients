import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { Client } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpRequest } from 'selenium-webdriver/http';
import { AppService } from './app.service'

/**
 * Client Service
 */
@Injectable()
export class ClientService extends AppService {
    constructor(
        private http: Http,
        private httpCleint: HttpClient,
        public config: AppConfig,
        private router: Router) {
        super();
        this.controller = '/clients';
    }
    /**
     * Creating new client
     * @param client Client
     */
    create(client: Client) {
        return this.http.post(this.config.apiUrl + this.controller + '/create', client,this.jwt());//, options);
    }
    update(client: Client) {
        return this.http.put(this.config.apiUrl + this.controller + '/update', client, this.jwt());//, options);
    }
    getAll() {
        return this.http.get(this.config.apiUrl + this.controller, this.jwt());
    }
    get(clientId: number) {
        return this.http.get(this.config.apiUrl + this.controller + '/' + clientId, this.jwt());
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

}