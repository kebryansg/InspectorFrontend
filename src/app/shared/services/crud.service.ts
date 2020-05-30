import {Injectable} from '@angular/core';
import 'rxjs/add/operator/delay';
import {HttpClient} from '@angular/common/http';

declare var configuracion: any;

@Injectable()
export class CrudService {
  readonly puerto = configuracion.url;

  constructor(
    private httpClient: HttpClient) {

  }

  async SeleccionarAsync(api: string, param?) {
    return await this.httpClient.get(this.puerto + api, {params: param, headers: this.getHeaders()}).toPromise();
  }

  login(api: string, objeto: any) {
    return this.httpClient.post(this.puerto + api, objeto, {headers: this.getHeaders()});
  }

  Actualizar(objeto: any, api: string) {
    return this.httpClient.put(this.puerto + api, objeto, {headers: this.getHeaders()});
  }

  Insertar(objeto: any, api: string) {
    return this.httpClient.post(this.puerto + api, objeto, {headers: this.getHeaders()});
  }

  Eliminar(api: string) {
    return this.httpClient.delete(this.puerto + api, {headers: this.getHeaders()});
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json'
      // , 'Access-Control-Allow-Origin': '*'
    };
    // let header = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    // if (localStorage.getItem('authToken'))
    //   header.append('Authorization', `${localStorage.getItem('tokenType')} ${localStorage.getItem('authToken')}`);
    // return header;
  }

  GetToFile(api, param?) {
    return this.httpClient.get(this.puerto + api, {params: param, headers: this.getHeaders(), responseType: 'blob'});
  }

  getURLServer() {
    return this.puerto;
  }
}
