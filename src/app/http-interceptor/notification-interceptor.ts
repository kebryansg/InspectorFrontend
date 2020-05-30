import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ToastData} from 'ng2-toasty';
import {finalize} from 'rxjs/operators';
import {NotificacionService} from '../shared/services/notificacion.service';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(
    private notificacionService: NotificacionService,) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const methods = ['POST', 'PUT'];
    let $visible = new Subject<any>();

    if (methods.includes(req.method)) {
      const toastOptions: any = {
        type: 'wait',
        title: 'Esperando respuesta...',
        showClose: true,
        timeout:0,
        theme: 'material',
        onAdd: (toast: ToastData) => {
          /* added */
          $visible.subscribe({
            complete: () => {
              this.notificacionService.clearToasty(toast.id);
            }
          });
        },
      };
      this.notificacionService.addToasty(toastOptions);
    }

    return next.handle(req)
      .pipe(
        finalize(() => {
          $visible.complete();
        })
      );
  }

}
