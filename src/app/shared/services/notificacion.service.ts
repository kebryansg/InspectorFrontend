import {Injectable} from '@angular/core';
import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {BehaviorSubject, Observable} from 'rxjs';

// const swal2 = require('sweetalert2');

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {

  private routerInfo: BehaviorSubject<any>;

  constructor(public toastyService: ToastyService,) {
    this.routerInfo = new BehaviorSubject<any>(null);
  }

  setValue(newValue): void {
    this.routerInfo.next(newValue);
  }

  getValue(): Observable<any> {
    return this.routerInfo.asObservable();
  }

  //#region Toasty
  clearToasty(id) {
    this.toastyService.clear(id);
  }

  addToasty(options: IToastyCustom) {
    if (!options) {
      return;
    }

    const toastOptions: IToastyCustom = {
      msg: options.msg || '',
      showClose: options.showClose,
      timeout: options.timeout || 3000,
      theme: options.theme || 'bootstrap',
      onAdd: (toast: ToastData) => {
      },
      onRemove: (toast: ToastData) => {
      },
      ...options
    };

    switch (options.type) {
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
      default:
        this.toastyService.default(toastOptions);
        break;
    }
  }

  //#endregion

}

interface IToastyCustom extends ToastOptions {
  type: 'default' | 'info' | 'success' | 'wait' | 'error' | 'warning'
}
