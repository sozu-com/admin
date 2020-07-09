import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionAgentComponent } from './collection-agent.component';

describe('CollectionAgentComponent', () => {
  let component: CollectionAgentComponent;
  let fixture: ComponentFixture<CollectionAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
