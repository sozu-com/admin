import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return '$0';
    }
  }

}
