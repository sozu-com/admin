import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaryLeadsDetailsComponent } from './notary-leads-details.component';

describe('NotaryLeadsDetailsComponent', () => {
  let component: NotaryLeadsDetailsComponent;
  let fixture: ComponentFixture<NotaryLeadsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaryLeadsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaryLeadsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
