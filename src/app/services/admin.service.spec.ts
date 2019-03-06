import { TestBed, inject } from '@angular/core/testing';
import { AdminService } from './admin.service';
import { HttpInterceptor } from './http-interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new Http(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]},
        AdminService,
        HttpInterceptor
      ]
    });
  });

  it('should be created', inject([AdminService], (service: AdminService) => {
    expect(service).toBeTruthy();
  }));
});
