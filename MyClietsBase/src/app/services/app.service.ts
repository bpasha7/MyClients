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
        const headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('currentUser') });
        return new RequestOptions({ headers: headers });
        // }
    }
}