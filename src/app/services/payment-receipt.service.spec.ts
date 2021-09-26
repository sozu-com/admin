import { TestBed, inject } from '@angular/core/testing';

import { PaymentReceiptService } from './payment-receipt.service';

describe('PaymentReceiptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentReceiptService]
    });
  });

  it('should be created', inject([PaymentReceiptService], (service: PaymentReceiptService) => {
    expect(service).toBeTruthy();
  }));
});
