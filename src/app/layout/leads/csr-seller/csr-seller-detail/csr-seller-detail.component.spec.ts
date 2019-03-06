import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrSellerDetailComponent } from './csr-seller-detail.component';

describe('CsrSellerDetailComponent', () => {
  let component: CsrSellerDetailComponent;
  let fixture: ComponentFixture<CsrSellerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrSellerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrSellerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
