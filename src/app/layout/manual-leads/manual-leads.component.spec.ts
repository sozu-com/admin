import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLeadsComponent } from './manual-leads.component';

describe('ManualLeadsComponent', () => {
  let component: ManualLeadsComponent;
  let fixture: ComponentFixture<ManualLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
