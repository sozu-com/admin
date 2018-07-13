import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrSellerComponent } from './csr-seller.component';

describe('CsrSellerComponent', () => {
  let component: CsrSellerComponent;
  let fixture: ComponentFixture<CsrSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
