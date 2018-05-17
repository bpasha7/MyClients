/**
 * Front end configurations
*/
export class AppConfig {
    // private readonly _host = 'http://localhost:4201';
    private readonly _host = 'http://api.bizmak.ru';
    public readonly apiUrl = this._host + '/api';
    public readonly photoUrl = this._host + '/photo/';
    public readonly defaultPhoto = this._host + '/photo/product.jpg';
  }
