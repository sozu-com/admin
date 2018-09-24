import { TestBed, async, inject } from '@angular/core/testing';

import { CsrBuyerGuard } from './csr-buyer.guard';

describe('CsrBuyerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsrBuyerGuard]
    });
  });

  it('should ...', inject([CsrBuyerGuard], (guard: CsrBuyerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
