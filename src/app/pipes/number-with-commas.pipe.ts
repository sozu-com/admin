import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithCommas'
})
export class NumberWithCommasPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
