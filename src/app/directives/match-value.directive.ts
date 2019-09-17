import { Directive, Input } from '@angular/core';
import {
  Validator,
  ValidationErrors,
  FormGroup,
  NG_VALIDATORS
} from '@angular/forms';
import { MatchValue } from './match-value.validator';
@Directive({
  selector: '[appMatchValue]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MatchValueDirective, multi: true }
  ]
})
export class MatchValueDirective implements Validator {
  @Input('appMatchValue') appMatchValue: string[] = [];
  constructor() {}
  validate(formGroup: FormGroup): ValidationErrors {
    return MatchValue(this.appMatchValue[0], this.appMatchValue[1])(
      formGroup
    );
  }
}
