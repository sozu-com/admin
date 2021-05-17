import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditManualLeadComponent } from './add-edit-manual-lead.component';

describe('AddEditManualLeadComponent', () => {
  let component: AddEditManualLeadComponent;
  let fixture: ComponentFixture<AddEditManualLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditManualLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditManualLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
