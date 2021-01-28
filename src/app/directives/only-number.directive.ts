import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { Constant } from '../common/constants';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g); //new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(
    private el: ElementRef,
    private constant: Constant
  ) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    // const current: string = this.el.nativeElement.value;
    // const next: string = current.concat(event.key);
    // const nextSecond: number = Number(next) + .00;
    // if (next && !String(next).match(this.regex)) {
    //   event.preventDefault();
    // } else if (nextSecond > 100.00) {
    //   event.preventDefault();
    // }

    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    let next: string;
    if (position) {
      next = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    } else {
      next = current.concat(event.key);
    }
    const nextSecond: number = Number(next) + .00;
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    } else if (nextSecond > 100.00) {
      event.preventDefault();
    }
  }

}
