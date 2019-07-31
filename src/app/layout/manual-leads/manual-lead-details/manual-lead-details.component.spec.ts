import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualLeadDetailsComponent } from './manual-lead-details.component';

describe('ManualLeadDetailsComponent', () => {
  let component: ManualLeadDetailsComponent;
  let fixture: ComponentFixture<ManualLeadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualLeadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualLeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
