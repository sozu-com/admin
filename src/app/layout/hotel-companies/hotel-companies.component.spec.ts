import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCompaniesComponent } from './hotel-companies.component';

describe('HotelCompaniesComponent', () => {
  let component: HotelCompaniesComponent;
  let fixture: ComponentFixture<HotelCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
