import { TestBed, async, inject } from '@angular/core/testing';

import { CsrSellerGuard } from './csr-seller.guard';

describe('CsrSellerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsrSellerGuard]
    });
  });

  it('should ...', inject([CsrSellerGuard], (guard: CsrSellerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
