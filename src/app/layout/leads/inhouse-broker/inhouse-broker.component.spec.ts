import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseBrokerComponent } from './inhouse-broker.component';

describe('InhouseBrokerComponent', () => {
  let component: InhouseBrokerComponent;
  let fixture: ComponentFixture<InhouseBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
