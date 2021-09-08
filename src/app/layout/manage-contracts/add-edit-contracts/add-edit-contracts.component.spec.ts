import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContractsComponent } from './add-edit-contracts.component';

describe('AddEditContractsComponent', () => {
  let component: AddEditContractsComponent;
  let fixture: ComponentFixture<AddEditContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
