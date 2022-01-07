import { TestBed, inject } from '@angular/core/testing';

import { PropertiesPdfService } from './properties-pdf.service';

describe('PropertiesPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertiesPdfService]
    });
  });

  it('should be created', inject([PropertiesPdfService], (service: PropertiesPdfService) => {
    expect(service).toBeTruthy();
  }));
});
