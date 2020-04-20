import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionIncomeComponent } from './commission-income.component';

describe('CommissionIncomeComponent', () => {
  let component: CommissionIncomeComponent;
  let fixture: ComponentFixture<CommissionIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
