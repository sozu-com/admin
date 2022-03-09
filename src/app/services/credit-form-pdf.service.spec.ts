import { TestBed, inject } from '@angular/core/testing';

import { CreditFormPdfService } from './credit-form-pdf.service';

describe('CreditFormPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreditFormPdfService]
    });
  });

  it('should be created', inject([CreditFormPdfService], (service: CreditFormPdfService) => {
    expect(service).toBeTruthy();
  }));
});
