import { HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';
import { Constant } from '../common/constants';

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  // Allow only numbers
  private regex: RegExp = new RegExp('^[0-9]*$');
  // Allow key codes for special events. Reflect : Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'Del', 'ArrowRight', 'ArrowLeft'];

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

}
