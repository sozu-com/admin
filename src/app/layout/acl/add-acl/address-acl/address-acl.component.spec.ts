import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAclComponent } from './address-acl.component';

describe('AddressAclComponent', () => {
  let component: AddressAclComponent;
  let fixture: ComponentFixture<AddressAclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressAclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
