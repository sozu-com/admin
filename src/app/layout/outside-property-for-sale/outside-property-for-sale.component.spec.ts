import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidePropertyForSaleComponent } from './outside-property-for-sale.component';

describe('OutsidePropertyForSaleComponent', () => {
  let component: OutsidePropertyForSaleComponent;
  let fixture: ComponentFixture<OutsidePropertyForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsidePropertyForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsidePropertyForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
