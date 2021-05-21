import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedProjectComponent } from './interested-project.component';

describe('InterestedProjectComponent', () => {
  let component: InterestedProjectComponent;
  let fixture: ComponentFixture<InterestedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
