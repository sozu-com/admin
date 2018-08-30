import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPropertyComponent } from './interested-property.component';
import { AdminService } from './../../../services/admin.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

describe('InterestedPropertyComponent', () => {
  let component: InterestedPropertyComponent;
  let fixture: ComponentFixture<InterestedPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPropertyComponent ],
      imports: [
        HttpModule,
        FormsModule,
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
    fixture = TestBed.createComponent(InterestedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
