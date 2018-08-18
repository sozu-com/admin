import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedPropertyComponent } from './interested-property.component';

describe('InterestedPropertyComponent', () => {
  let component: InterestedPropertyComponent;
  let fixture: ComponentFixture<InterestedPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
