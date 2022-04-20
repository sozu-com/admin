import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsideProDetailComponent } from './outside-pro-detail.component';

describe('OutsideProDetailComponent', () => {
  let component: OutsideProDetailComponent;
  let fixture: ComponentFixture<OutsideProDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsideProDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsideProDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
