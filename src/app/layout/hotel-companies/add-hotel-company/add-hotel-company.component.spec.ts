import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHotelCompanyComponent } from './add-hotel-company.component';

describe('AddHotelCompanyComponent', () => {
  let component: AddHotelCompanyComponent;
  let fixture: ComponentFixture<AddHotelCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHotelCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHotelCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
