import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SozuIncomeComponent } from './sozu-income.component';

describe('SozuIncomeComponent', () => {
  let component: SozuIncomeComponent;
  let fixture: ComponentFixture<SozuIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SozuIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SozuIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
