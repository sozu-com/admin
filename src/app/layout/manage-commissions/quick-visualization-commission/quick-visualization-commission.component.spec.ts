import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickVisualizationCommissionComponent } from './quick-visualization-commission.component';

describe('QuickVisualizationCommissionComponent', () => {
  let component: QuickVisualizationCommissionComponent;
  let fixture: ComponentFixture<QuickVisualizationCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickVisualizationCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickVisualizationCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
