import { Component} from '@angular/core';
import { Http, Headers, RequestOptions, Response, RequestMethod, ResponseContentType } from '@angular/http';
@Component({
    selector: 'clients',
    styleUrls: ['./clients.component.css'],
    templateUrl: './clients.component.html',
})

export class ClientsComponent {
    constructor(private http: Http) {
    }
    test(){
        this.http.get('http://localhost:4201/api/values').subscribe(
            data => {
                var res = data.json().message
            }
    );
    }
}