import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPrice'
})
export class CustomPricePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      if(args != 'remove'){
      return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'pesos M.N.';
      }
      else{
        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      if(args != 'remove'){
        return '$0' + 'pesos M.N.';
        }
        else{
          return '$0';
        }
    }
  }

}
