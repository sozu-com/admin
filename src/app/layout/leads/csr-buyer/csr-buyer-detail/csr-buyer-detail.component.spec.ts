import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrBuyerDetailComponent } from './csr-buyer-detail.component';

describe('CsrBuyerDetailComponent', () => {
  let component: CsrBuyerDetailComponent;
  let fixture: ComponentFixture<CsrBuyerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrBuyerDetailComponent ]
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
