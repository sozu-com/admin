import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLeadDetailsComponent } from './bank-lead-details.component';

describe('BankLeadDetailsComponent', () => {
  let component: BankLeadDetailsComponent;
  let fixture: ComponentFixture<BankLeadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankLeadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankLeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
