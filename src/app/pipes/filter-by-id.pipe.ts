import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(value: any= [], args?: any): any {
    if (args) {

      return value.filter(data => {
        if (data.id == args) {
          return data;
        }
      });
    }
    return value;
  }

}
