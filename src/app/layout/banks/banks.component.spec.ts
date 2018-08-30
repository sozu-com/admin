import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BanksComponent } from './banks.component';
import { AdminService } from './../../services/admin.service';
import { HttpInterceptor } from './../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { Constant } from './../../common/constants';

describe('BanksComponent', () => {
  let component: BanksComponent;
  let fixture: ComponentFixture<BanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksComponent ],
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
    fixture = TestBed.createComponent(BanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
