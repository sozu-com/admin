import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrRenterComponent } from './csr-renter.component';

describe('CsrRenterComponent', () => {
  let component: CsrRenterComponent;
  let fixture: ComponentFixture<CsrRenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrRenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
