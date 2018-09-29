import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any=[], text?: any): any {
    //return value.toUpperCase();
    if(text){
      if(text.length < 1 ){
        return items;
      }
      return items.filter(item =>{
        if(item.name){
          return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
        }
      }
    );
    }
    return items;
  }
}
