import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseUsersComponent } from './inhouse-users.component';

describe('InhouseUsersComponent', () => {
  let component: InhouseUsersComponent;
  let fixture: ComponentFixture<InhouseUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
