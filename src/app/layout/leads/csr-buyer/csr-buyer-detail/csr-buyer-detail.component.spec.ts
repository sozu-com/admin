import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CsrBuyerDetailComponent } from './csr-buyer-detail.component';
import { AdminService } from './../../../../services/admin.service';
import { HttpInterceptor } from './../../../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { ChatComponent } from './../../../common-blocks/chat/chat.component';
import { InterestedPropertyComponent } from './../../../common-blocks/interested-property/interested-property.component';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ChatTimePipe } from './../../../../pipes/chat-time.pipe';

describe('CsrBuyerDetailComponent', () => {
  let component: CsrBuyerDetailComponent;
  let fixture: ComponentFixture<CsrBuyerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CsrBuyerDetailComponent,
        ChatComponent,
        InterestedPropertyComponent,
        ChatTimePipe
      ],
      imports: [
        HttpModule,
        FormsModule,
        Ng2TelInputModule,
        NgxPaginationModule,
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
    fixture = TestBed.createComponent(CsrBuyerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
