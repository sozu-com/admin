import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseBrokerDetailComponent } from './inhouse-broker-detail.component';

describe('InhouseBrokerDetailComponent', () => {
  let component: InhouseBrokerDetailComponent;
  let fixture: ComponentFixture<InhouseBrokerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseBrokerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseBrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
