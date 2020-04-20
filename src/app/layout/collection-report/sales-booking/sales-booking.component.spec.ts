import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesBookingComponent } from './sales-booking.component';

describe('SalesBookingComponent', () => {
  let component: SalesBookingComponent;
  let fixture: ComponentFixture<SalesBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
