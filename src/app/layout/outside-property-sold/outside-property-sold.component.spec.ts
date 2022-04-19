import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidePropertySoldComponent } from './outside-property-sold.component';

describe('OutsidePropertySoldComponent', () => {
  let component: OutsidePropertySoldComponent;
  let fixture: ComponentFixture<OutsidePropertySoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsidePropertySoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsidePropertySoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
