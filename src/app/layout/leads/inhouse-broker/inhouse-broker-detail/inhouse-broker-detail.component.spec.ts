import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseBrokerDetailComponent } from './inhouse-broker-detail.component';
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

describe('InhouseBrokerDetailComponent', () => {
  let component: InhouseBrokerDetailComponent;
  let fixture: ComponentFixture<InhouseBrokerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InhouseBrokerDetailComponent,
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
    fixture = TestBed.createComponent(InhouseBrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
