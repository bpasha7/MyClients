import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private controller = '/stores';
  constructor(
        private http: Http,
        private config: AppConfig
  ) { }
  getStore(name: string) {
    return this.http.get(this.config.apiUrl + this.controller + '/' + name);
  }
}
