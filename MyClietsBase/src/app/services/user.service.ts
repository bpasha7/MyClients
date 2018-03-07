import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from '../app.config';
import { User } from '../models/index';
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
        //public config: AppConfig,
        private router: Router) { }
    /**#toDo
     * Add create and login functions here
     */

    /**
     * create authorization header with jwt token
     */
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}