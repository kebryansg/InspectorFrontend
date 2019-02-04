import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';

import { finalize, tap } from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    this.spinner.show();

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
          this.spinner.hide()
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          // console.log(msg);
        })
      );
  }
}

// constructor(private spinner: NgxSpinnerService) { }
