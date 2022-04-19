import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidePropertyDetailComponent } from './outside-property-detail.component';

describe('OutsidePropertyDetailComponent', () => {
  let component: OutsidePropertyDetailComponent;
  let fixture: ComponentFixture<OutsidePropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsidePropertyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsidePropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
