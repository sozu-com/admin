import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'chatTime'
})

export class ChatTimePipe implements PipeTransform {

  transform(created_at: any): any {
    return moment(created_at, 'YYYY-MM-DD H:m:s').utc(true).local().fromNow();
  }

}
