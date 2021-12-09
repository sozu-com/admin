import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpouseDocComponent } from './spouse-doc.component';

describe('SpouseDocComponent', () => {
  let component: SpouseDocComponent;
  let fixture: ComponentFixture<SpouseDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpouseDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpouseDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
