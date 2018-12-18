import {Injectable} from '@angular/core';
import 'rxjs/add/operator/delay';
import { Http, Headers } from '@angular/http';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';

@Injectable()
export class CrudService {
  readonly puerto = 'http://localhost:8000/';

  constructor(
    private http: Http,
    private httpClient: HttpClient) {

  }

  Seleccionar(api, param?) {
    return this.http.get(this.puerto + api, {params: param, headers: this.getHeaders()});
  }

  Ejecutar(api, param?) {
    return this.http.get(this.puerto + api, {params: param, headers: this.getHeaders()});
  }

  SeleccionarAsync(api, param?) {
    var headerOptions = new HttpHeaders(this.getHeaders().toJSON());
    return this.httpClient.get(this.puerto + api, {params: param, headers: headerOptions}).toPromise();
  }

  login(api, objeto) {
    // var body = objeto;
    // var requestOptions = new RequestOptions({  method: RequestMethod.Post, headers: this.getHeaders() });
    // return this.http.post(this.puerto + api, body, requestOptions).map(res => res.json());
    var headerOptions = new HttpHeaders(this.getHeaders().toJSON());
    return this.httpClient.post(this.puerto + api, objeto, {headers: headerOptions});
  }

  _listParams(api, params?) {
    return this.httpClient.post(this.puerto + api + '/list', params).toPromise();
  }

  Actualizar(objeto, api) {
    //var body = objeto;
    var headerOptions = new HttpHeaders(this.getHeaders().toJSON());
    return this.httpClient.put(this.puerto + api, objeto, {headers: headerOptions});
  }

  Insertar(objeto, api) {
    var headerOptions = new HttpHeaders(this.getHeaders().toJSON());
    return this.httpClient.post(this.puerto + api, objeto, {headers: headerOptions});
  }

  Eliminar(api) {
    var headerOptions = new HttpHeaders(this.getHeaders().toJSON());
    return this.httpClient.delete(this.puerto + api, {headers: headerOptions});
  }

  getHeaders() {
    let header = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    if (localStorage.getItem('authToken'))
      header.append('Authorization', `${ localStorage.getItem('tokenType') } ${ localStorage.getItem('authToken') }`);
    return header;
  }
}
