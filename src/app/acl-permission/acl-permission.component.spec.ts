import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclPermissionComponent } from './acl-permission.component';

describe('AclPermissionComponent', () => {
  let component: AclPermissionComponent;
  let fixture: ComponentFixture<AclPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AclPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
