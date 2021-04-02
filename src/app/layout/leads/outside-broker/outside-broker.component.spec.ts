import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideBrokerComponent } from './outside-broker.component';

describe('OutsideBrokerComponent', () => {
  let component: OutsideBrokerComponent;
  let fixture: ComponentFixture<OutsideBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsideBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
