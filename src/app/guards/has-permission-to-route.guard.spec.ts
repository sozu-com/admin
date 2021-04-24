import { TestBed, async, inject } from '@angular/core/testing';

import { HasPermissionToRouteGuard } from './has-permission-to-route.guard';

describe('HasPermissionToRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasPermissionToRouteGuard]
    });
  });

  it('should ...', inject([HasPermissionToRouteGuard], (guard: HasPermissionToRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
