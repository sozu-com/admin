import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryLeadsComponent } from './notary-leads.component';

describe('NotaryLeadsComponent', () => {
  let component: NotaryLeadsComponent;
  let fixture: ComponentFixture<NotaryLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaryLeadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
