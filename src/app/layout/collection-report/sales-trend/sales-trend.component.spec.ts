import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrendComponent } from './sales-trend.component';

describe('SalesTrendComponent', () => {
  let component: SalesTrendComponent;
  let fixture: ComponentFixture<SalesTrendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesTrendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
