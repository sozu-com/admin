import { TestBed, async, inject } from '@angular/core/testing';

import { AclUserGuard } from './acl-user.guard';

describe('AclUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AclUserGuard]
    });
  });

  it('should ...', inject([AclUserGuard], (guard: AclUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
