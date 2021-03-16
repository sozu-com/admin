import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAccountStatementComponent } from './download-account-statement.component';

describe('DownloadAccountStatementComponent', () => {
  let component: DownloadAccountStatementComponent;
  let fixture: ComponentFixture<DownloadAccountStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadAccountStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
