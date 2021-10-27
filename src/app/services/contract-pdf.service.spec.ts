import { TestBed, inject } from '@angular/core/testing';

import { ContractPdfService } from './contract-pdf.service';

describe('ContractPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractPdfService]
    });
  });

  it('should be created', inject([ContractPdfService], (service: ContractPdfService) => {
    expect(service).toBeTruthy();
  }));
});
