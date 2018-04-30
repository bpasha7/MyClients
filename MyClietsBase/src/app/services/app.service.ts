import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
export class AppService {
    private messageSource;
    currentMessage;
    constructor(
        public router: Router
    ) {
        this.messageSource = new BehaviorSubject<string>('');
        this.currentMessage = this.messageSource.asObservable();
    }
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
    public notifyMenu(message: string) {
        this.messageSource.next(message);
    }
    public goLogin() {
        this.router.navigate(['/login']);
    }
}
