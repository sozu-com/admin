import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberex'
})
export class NumberexPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'XXX-XXX-XXXX';
  }

}
