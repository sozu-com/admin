import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAddEditComponent } from './credit-add-edit.component';

describe('CreditAddEditComponent', () => {
  let component: CreditAddEditComponent;
  let fixture: ComponentFixture<CreditAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
