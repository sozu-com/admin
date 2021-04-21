import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesForSaleListingComponent } from './properties-for-sale-listing.component';

describe('PropertiesForSaleListingComponent', () => {
  let component: PropertiesForSaleListingComponent;
  let fixture: ComponentFixture<PropertiesForSaleListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesForSaleListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesForSaleListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
