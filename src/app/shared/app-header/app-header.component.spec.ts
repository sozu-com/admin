import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { AdminService } from './../../services/admin.service';
import { HttpInterceptor } from './../../services/http-interceptor';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ],
      imports: [
        HttpModule,
        MalihuScrollbarModule.forRoot(),
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
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
