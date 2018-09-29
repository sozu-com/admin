import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {

  transform(value: any=[], args?: any): any {
    //return value.toUpperCase();
    if(args){

      return value.filter(data =>{
        console.log(data)
        if(data.id == args){
          return data;
        }
      });
    }
    return value;
  }

}
