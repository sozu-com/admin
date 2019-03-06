import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateThumbComponent } from './generate-thumb.component';

describe('GenerateThumbComponent', () => {
  let component: GenerateThumbComponent;
  let fixture: ComponentFixture<GenerateThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
