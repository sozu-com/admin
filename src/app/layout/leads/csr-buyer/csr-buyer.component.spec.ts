import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrBuyerComponent } from './csr-buyer.component';

describe('CsrBuyerComponent', () => {
  let component: CsrBuyerComponent;
  let fixture: ComponentFixture<CsrBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
