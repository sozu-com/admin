import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySoldComponent } from './property-sold.component';

describe('PropertySoldComponent', () => {
  let component: PropertySoldComponent;
  let fixture: ComponentFixture<PropertySoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
