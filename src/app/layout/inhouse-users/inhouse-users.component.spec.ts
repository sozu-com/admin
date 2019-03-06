import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InhouseUsersComponent } from './inhouse-users.component';
import { AdminService } from './../../services/admin.service';
import { HttpInterceptor } from './../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { AddressComponent } from './address/address.component';

describe('InhouseUsersComponent', () => {
  let component: InhouseUsersComponent;
  let fixture: ComponentFixture<InhouseUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseUsersComponent, AddressComponent ],
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
        HttpInterceptor
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
