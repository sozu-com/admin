import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBlockComponent } from './project-block.component';

describe('ProjectBlockComponent', () => {
  let component: ProjectBlockComponent;
  let fixture: ComponentFixture<ProjectBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
