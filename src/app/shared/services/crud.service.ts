import {Injectable} from '@angular/core';
import 'rxjs/add/operator/delay';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
declare  var configuracion: any;

@Injectable()
export class CrudService {
  readonly puerto = configuracion.url;

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService) {

  }

  Seleccionar(api, param?) {
    return this.http.get(this.puerto + api, {params: param, headers: this.getHeaders()});
  }

  Ejecutar(api, param?) {
    return this.http.get(this.puerto + api, {params: param, headers: this.getHeaders()});
  }

  async SeleccionarAsync(api, param?) {
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

  GetToFile(api, param?) {
    return this.httpClient.get( this.puerto + api, { params: param, headers: this.getHeaders().toJSON(), responseType: 'blob' } );
  }

  getURLServer(){
    return this.puerto;
  }
}
