import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickVisualizationIncomeComponent } from './quick-visualization-income.component';

describe('QuickVisualizationIncomeComponent', () => {
  let component: QuickVisualizationIncomeComponent;
  let fixture: ComponentFixture<QuickVisualizationIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickVisualizationIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickVisualizationIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
