import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyComponent } from './property.component';
import { AdminService } from '../../../services/admin.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { Constant } from './../../../common/constants';
import { ModalModule } from 'ngx-bootstrap/modal';

describe('PropertyComponent', () => {
  let component: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyComponent ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        ModalModule.forRoot(),
      ],
      providers: [
        {provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new Http(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]},
        AdminService,
        HttpInterceptor,
        Constant
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
