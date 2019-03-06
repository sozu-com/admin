import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedPropertyComponent } from './viewed-property.component';

describe('ViewedPropertyComponent', () => {
  let component: ViewedPropertyComponent;
  let fixture: ComponentFixture<ViewedPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
