import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewedProjectsComponent } from './viewed-projects.component';

describe('ViewedProjectsComponent', () => {
  let component: ViewedProjectsComponent;
  let fixture: ComponentFixture<ViewedProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewedProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
