import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CsrCloserComponent } from './csr-closer.component';
import { AdminService } from '../../../services/admin.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { Constant } from './../../../common/constants';

describe('CsrCloserComponent', () => {
  let component: CsrCloserComponent;
  let fixture: ComponentFixture<CsrCloserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrCloserComponent ],
      imports: [
        HttpModule,
        FormsModule,
        Ng2TelInputModule,
        NgxPaginationModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(CsrCloserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
