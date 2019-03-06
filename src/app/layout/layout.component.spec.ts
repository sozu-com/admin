import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { AdminService } from './../services/admin.service';
import { HttpInterceptor } from './../services/http-interceptor';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppHeaderComponent } from './../shared/app-header/app-header.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent, AppHeaderComponent ],
      imports: [
        HttpModule,
        MalihuScrollbarModule.forRoot(),
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
