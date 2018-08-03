import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrCloserComponent } from './csr-closer.component';

describe('CsrCloserComponent', () => {
  let component: CsrCloserComponent;
  let fixture: ComponentFixture<CsrCloserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrCloserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrCloserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
