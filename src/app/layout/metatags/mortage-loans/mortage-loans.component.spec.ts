import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MortageLoansComponent } from './mortage-loans.component';

describe('MortageLoansComponent', () => {
  let component: MortageLoansComponent;
  let fixture: ComponentFixture<MortageLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MortageLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MortageLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
