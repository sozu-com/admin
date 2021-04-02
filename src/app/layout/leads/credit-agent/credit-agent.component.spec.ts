import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditAgentComponent } from './credit-agent.component';

describe('CreditAgentComponent', () => {
  let component: CreditAgentComponent;
  let fixture: ComponentFixture<CreditAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
