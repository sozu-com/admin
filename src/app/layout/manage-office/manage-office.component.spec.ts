import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOfficeComponent } from './manage-office.component';

describe('ManageOfficeComponent', () => {
  let component: ManageOfficeComponent;
  let fixture: ComponentFixture<ManageOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
