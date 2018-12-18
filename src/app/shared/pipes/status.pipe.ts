import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    switch (value) {
      case 'ACT': result = 'Activo';  break;
      case 'INA': result = 'Inactivo';  break;
      case 'ANU': result = 'Anulado';  break;
      case 'PEN': result = 'Pendiente';  break;
    }
    return result;
  }

}
