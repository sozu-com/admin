import { TestBed, inject } from '@angular/core/testing';

import { LegalContractPdfService } from './legal-contract-pdf.service';

describe('LegalContractPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalContractPdfService]
    });
  });

  it('should be created', inject([LegalContractPdfService], (service: LegalContractPdfService) => {
    expect(service).toBeTruthy();
  }));
});
