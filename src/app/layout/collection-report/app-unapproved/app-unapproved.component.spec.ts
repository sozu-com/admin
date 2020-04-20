import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUnapprovedComponent } from './app-unapproved.component';

describe('AppUnapprovedComponent', () => {
  let component: AppUnapprovedComponent;
  let fixture: ComponentFixture<AppUnapprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppUnapprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUnapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
