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
      case 'APR': result = 'Aprobado';  break;
      case 'REP': result = 'Reprobado';  break;
      case 'P': result = 'Persona';  break;
      case 'E': result = 'Empresa';  break;
      case 'S': result = 'Si';  break;
      case 'N': result = 'No';  break;
      case 'A': result = 'No Aplica';  break;
    }
    return result;
  }

}
