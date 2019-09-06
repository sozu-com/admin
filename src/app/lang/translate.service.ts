import { Injectable } from '@angular/core';

import { locale as en } from './app.en';
import { locale as es } from './app.es';


@Injectable()
export class TranslateService {

  dictionary: Object = {
    'en': en,
    'es': es
  };

  lang_code: any = 'en';
  lang: any;

  constructor() {
    this.lang = this.dictionary[this.lang_code].data.app;
  }

  setLanguage(code) {
    this.lang_code = code;
    this.lang = this.dictionary[this.lang_code].data.app;
  }


}
