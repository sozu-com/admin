import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideBrokerDetailComponent } from './outside-broker-detail.component';

describe('OutsideBrokerDetailComponent', () => {
  let component: OutsideBrokerDetailComponent;
  let fixture: ComponentFixture<OutsideBrokerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsideBrokerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideBrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
