import { TestBed, async, inject } from '@angular/core/testing';

import { CsrCloserGuard } from './csr-closer.guard';

describe('CsrCloserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsrCloserGuard]
    });
  });

  it('should ...', inject([CsrCloserGuard], (guard: CsrCloserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
