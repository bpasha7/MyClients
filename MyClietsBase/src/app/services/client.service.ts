import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { Client } from '../models/index';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Client Service
 */
@Injectable()
export class ClientService {
    /**
     * Rest controller
     */
    private controller: string = '/clients';
    constructor(private http: Http,
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
    /**
     * create authorization header with jwt token
     */
    private jwt() {
        let headers = new Headers({ 'Authorization': 'Bearer ' + '345' });
        return new RequestOptions({ headers: headers });
        
        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser && currentUser.token) {
        //     let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        //     return new RequestOptions({ headers: headers });
        // }
    }
}