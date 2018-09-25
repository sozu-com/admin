import { TestBed, async, inject } from '@angular/core/testing';

import { CsrBrokerGuard } from './csr-broker.guard';

describe('CsrBrokerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsrBrokerGuard]
    });
  });

  it('should ...', inject([CsrBrokerGuard], (guard: CsrBrokerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
