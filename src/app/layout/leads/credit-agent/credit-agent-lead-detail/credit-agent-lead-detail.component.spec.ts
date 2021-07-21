import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAgentLeadDetailComponent } from './credit-agent-lead-detail.component';

describe('CreditAgentLeadDetailComponent', () => {
  let component: CreditAgentLeadDetailComponent;
  let fixture: ComponentFixture<CreditAgentLeadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAgentLeadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAgentLeadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
