import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyComponent } from './add-property.component';
import { AdminService } from '../../../services/admin.service';
import { CommonService } from '../../../services/common.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { Constant } from './../../../common/constants';
import { AgmCoreModule } from '@agm/core';

describe('AddPropertyComponent', () => {
  let component: AddPropertyComponent;
  let fixture: ComponentFixture<AddPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyComponent ],
      imports: [
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2TelInputModule,
        NgxPaginationModule,
        RouterTestingModule.withRoutes([]),
        AgmCoreModule.forRoot({})
      ],
      providers: [
        {provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => new Http(backend, defaultOptions),
          deps: [XHRBackend, RequestOptions]},
        AdminService,
        CommonService,
        HttpInterceptor,
        Constant
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
