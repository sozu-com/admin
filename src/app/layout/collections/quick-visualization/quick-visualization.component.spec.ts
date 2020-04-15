import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickVisualizationComponent } from './quick-visualization.component';

describe('QuickVisualizationComponent', () => {
  let component: QuickVisualizationComponent;
  let fixture: ComponentFixture<QuickVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
