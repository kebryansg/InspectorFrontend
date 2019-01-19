import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autorizado'
})
export class AutorizadoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value)? 'Autorizado': 'No Autorizado';
  }

}
