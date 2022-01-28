import { TestBed, inject } from '@angular/core/testing';

import { BotturaContractPdfService } from './bottura-contract-pdf.service';

describe('BotturaContractPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotturaContractPdfService]
    });
  });

  it('should be created', inject([BotturaContractPdfService], (service: BotturaContractPdfService) => {
    expect(service).toBeTruthy();
  }));
});
