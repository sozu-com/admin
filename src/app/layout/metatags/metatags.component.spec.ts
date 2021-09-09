import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetatagsComponent } from './metatags.component';

describe('MetatagsComponent', () => {
  let component: MetatagsComponent;
  let fixture: ComponentFixture<MetatagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetatagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetatagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
