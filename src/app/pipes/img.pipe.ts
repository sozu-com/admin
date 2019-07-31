import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(item: any, size?: any): any {
    if (!item) {
      return false;
    }
    if (item && item.name && (item.name !== undefined)) {
      return false;
    }
    if (size === 'thumb') {
      return item.replace('uploads\/', 'thumbs\/200x200\/');
    }
    if (size === 'small') {
      return item.replace('uploads\/', 'thumbs\/300x300\/');
    }
    if (size === 'medium') {
      return item.replace('uploads\/', 'thumbs\/400x400\/');
    }
    if (size === 'large') {
      return item;
    }
    return item;
  }

}
