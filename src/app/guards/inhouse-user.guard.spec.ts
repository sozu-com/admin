import { TestBed, async, inject } from '@angular/core/testing';

import { InhouseUserGuard } from './inhouse-user.guard';

describe('InhouseUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InhouseUserGuard]
    });
  });

  it('should ...', inject([InhouseUserGuard], (guard: InhouseUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
