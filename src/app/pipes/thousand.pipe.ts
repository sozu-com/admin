import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand'
})
export class ThousandPipe implements PipeTransform {

  transform(input: any, args?: any): any {
    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
      if (isNaN(input)) { return '$0'; }
      if (input < 1000) { return '$' + input; }
      exp = Math.floor(Math.log(input) / Math.log(1000));
      return '$' + (input / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];
  }
}
