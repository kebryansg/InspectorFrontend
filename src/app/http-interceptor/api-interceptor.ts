import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;


    if (localStorage.getItem('authToken')) {
      req = req.clone({
        setHeaders: {
          'Authorization': `${localStorage.getItem('tokenType')} ${localStorage.getItem('authToken')}`
        }
      })
    }

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed'
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          // console.log(msg);
        })
      );
  }
}

// constructor(private spinner: NgxSpinnerService) { }
