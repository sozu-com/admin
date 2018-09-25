import { TestBed, async, inject } from '@angular/core/testing';

import { DataCollectorGuard } from './data-collector.guard';

describe('DataCollectorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCollectorGuard]
    });
  });

  it('should ...', inject([DataCollectorGuard], (guard: DataCollectorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
