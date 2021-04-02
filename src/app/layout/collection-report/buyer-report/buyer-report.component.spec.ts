import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerReportComponent } from './buyer-report.component';

describe('BuyerReportComponent', () => {
  let component: BuyerReportComponent;
  let fixture: ComponentFixture<BuyerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
