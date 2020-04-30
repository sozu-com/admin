import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})
export class RoundNumberPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const v = Math.floor(value * 100) / 100;
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
