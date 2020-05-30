import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoggingInterceptor} from './api-interceptor';
import {NotificationInterceptor} from './notification-interceptor';


/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
];
