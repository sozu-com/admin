import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AdminService } from './../services/admin.service';
import { HttpInterceptor } from './../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Constant } from './../common/constants';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
        LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.rectangleBounce,
          primaryColour: '#00B96F'
        }),
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
