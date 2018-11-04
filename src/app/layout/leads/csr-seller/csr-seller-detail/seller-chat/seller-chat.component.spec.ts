import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerChatComponent } from './seller-chat.component';

describe('SellerChatComponent', () => {
  let component: SellerChatComponent;
  let fixture: ComponentFixture<SellerChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
