import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Img360viewerComponent } from './img360viewer.component';

describe('Img360viewerComponent', () => {
  let component: Img360viewerComponent;
  let fixture: ComponentFixture<Img360viewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Img360viewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Img360viewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
