import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAnalysisComponent } from './location-analysis.component';

describe('LocationAnalysisComponent', () => {
  let component: LocationAnalysisComponent;
  let fixture: ComponentFixture<LocationAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
