import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAclComponent } from './add-acl.component';

describe('AddAclComponent', () => {
  let component: AddAclComponent;
  let fixture: ComponentFixture<AddAclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
