import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrCloserDetailComponent } from './csr-closer-detail.component';

describe('CsrCloserDetailComponent', () => {
  let component: CsrCloserDetailComponent;
  let fixture: ComponentFixture<CsrCloserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrCloserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrCloserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
