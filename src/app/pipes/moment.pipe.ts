import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(dateTime: any, args: any = 'YYYY-MM-DD H:m:s'): any {
    return moment(dateTime, args ).utc(true).local().format('LLLL');
    // return moment(dateTime, args ).utc(true).local().fromNow();
  }

}
