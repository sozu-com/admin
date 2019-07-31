import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankLeadsComponent } from './bank-leads.component';

describe('BankLeadsComponent', () => {
  let component: BankLeadsComponent;
  let fixture: ComponentFixture<BankLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
