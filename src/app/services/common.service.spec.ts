import { TestBed, inject } from '@angular/core/testing';

import { CommonService } from './common.service';
import { HttpInterceptor } from './http-interceptor';
import { AdminService } from './admin.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

describe('CommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new Http(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]},
        CommonService,
        AdminService,
        HttpInterceptor
      ]
    });
  });

  it('should be created', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));
});
