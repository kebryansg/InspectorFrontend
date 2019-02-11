import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';

declare var configuracion: any;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  send(message, key) {

    let body = {
      'notification': {
        'title': 'Inspector Polux',
        'body': message,
        'icon': 'stock_ticker_update',
        'color': '#f45342'
      },
      'to': key
    };
    console.log(configuracion.fcm);

    var headerOptions = new HttpHeaders({
      Authorization: 'key=' + configuracion.fcm,
      'Content-Type': 'application/json'
    });

    return new Promise((resolve, reject) => {
      this.httpClient.post('https://fcm.googleapis.com/fcm/send', body, {headers: headerOptions})
        .subscribe(
          (result: any) => {
            console.log(result);
            if (result.failure == 0)
              resolve(true);
            resolve(false);
          },
          (error) => resolve(false)
        );

    });
  }
}

// {
//   "multicast_id": 5765589500641014681,
//   "success": 0,
//   "failure": 1,
//   "canonical_ids": 0,
//   "results": [
//     {
//       "error": "NotRegistered"
//     }
//   ]
// }
