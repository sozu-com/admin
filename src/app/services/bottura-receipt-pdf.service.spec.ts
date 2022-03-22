import { TestBed, inject } from '@angular/core/testing';

import { BotturaReceiptPdfService } from './bottura-receipt-pdf.service';

describe('BotturaReceiptPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotturaReceiptPdfService]
    });
  });

  it('should be created', inject([BotturaReceiptPdfService], (service: BotturaReceiptPdfService) => {
    expect(service).toBeTruthy();
  }));
});
