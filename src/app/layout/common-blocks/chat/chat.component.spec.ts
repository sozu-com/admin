import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { AdminService } from './../../../services/admin.service';
import { HttpInterceptor } from './../../../services/http-interceptor';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { ChatTimePipe } from './../../../pipes/chat-time.pipe';
// import * as jquery from 'jquery';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent, ChatTimePipe ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule.withRoutes([]),
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
