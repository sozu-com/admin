import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrearReportComponent } from './arrear-report.component';

describe('ArrearReportComponent', () => {
  let component: ArrearReportComponent;
  let fixture: ComponentFixture<ArrearReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrearReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrearReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
