import {Injectable} from '@angular/core';
import 'rxjs/add/operator/delay';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';

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

  /**
   * Petición GET
   * @param api Url
   * @param params Parametros Opcional*
   * @constructor
   */
  Obtener(api: string, params?: any) {
    return this.httpClient.get(this.puerto + api, {headers: this.getHeaders(), params: params})
      .pipe(
        take(1)
      );
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

  private getHeaders() {
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
