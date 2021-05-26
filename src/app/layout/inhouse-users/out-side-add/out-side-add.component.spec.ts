import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutSideAddComponent } from './out-side-add.component';

describe('OutSideAddComponent', () => {
  let component: OutSideAddComponent;
  let fixture: ComponentFixture<OutSideAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutSideAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutSideAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
