import { Http, Headers, RequestOptions, Response } from '@angular/http';
export class AppService {
    /**
    * Web api controller
    */
    protected controller: string;
    /**
     * create authorization header with jwt token
     */
    protected jwt() {
        // let headers = new Headers({ 'Authorization': 'Bearer ' + '345' });
        // return new RequestOptions({ headers: headers });

        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRlc3QiLCJuYW1laWQiOiIxIiwibmJmIjoxNTIyNzM0MDE0LCJleHAiOjE1MjUzMjYwMTQsImlhdCI6MTUyMjczNDAxNH0.ngZxp3bif9Nqu3YO2e-f6MesjKxYMKB5JL1gCB-Hpkg' });
        return new RequestOptions({ headers: headers });
        // }
    }
}