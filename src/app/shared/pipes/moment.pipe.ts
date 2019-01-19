import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    moment.locale('es');
    let date = moment(value); // add this 2 of 4
    return date.format('lll');
  }

}
