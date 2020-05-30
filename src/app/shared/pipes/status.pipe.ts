import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  case = {
    'ACT': 'Activo',
    'INA': 'Inactivo',
    'ANU': 'Anulado',
    'PEN': 'Pendiente',
    'APR': 'Aprobado',
    'REP': 'Reprobado',
    'P': 'Persona',
    'E': 'Empresa',
    'S': 'Si',
    'N': 'No',
    'A': 'No',
  };

  transform(value: any, args?: any): any {
    return this.case[value];
  }

}
