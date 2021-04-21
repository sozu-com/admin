import { TestBed, inject } from '@angular/core/testing';

import { GenerateOfferPdfService } from './generate-offer-pdf.service';

describe('GenerateOfferPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerateOfferPdfService]
    });
  });

  it('should be created', inject([GenerateOfferPdfService], (service: GenerateOfferPdfService) => {
    expect(service).toBeTruthy();
  }));
});
