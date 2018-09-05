import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatTime'
})

export class ChatTimePipe implements PipeTransform {

  transform(created_at: any, format: string, type: number): any {
    if (type === 1) {
      return moment(created_at, format).utc(true).local().fromNow();
    } else if (type === 3) {
      // converting date to utc
      return moment(created_at, format).utc(true);
    } else if (type === 4) {
      // converting date to local
      return moment(created_at, format).utc(true).local().format('YYYY-MM-DD');
    } else {
      return moment(created_at, format).utc(true).local().format('LLLL');
    }
  }

}
