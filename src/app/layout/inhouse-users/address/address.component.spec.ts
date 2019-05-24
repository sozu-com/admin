import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressComponent } from './address.component';
import { AdminService } from './../../../services/admin.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

describe('AddressComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressComponent ],
      imports: [
        HttpModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new Http(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]},
        AdminService,
        HttpInterceptor
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
