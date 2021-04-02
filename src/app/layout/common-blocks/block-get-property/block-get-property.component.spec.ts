import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockGetPropertyComponent } from './block-get-property.component';

describe('BlockGetPropertyComponent', () => {
  let component: BlockGetPropertyComponent;
  let fixture: ComponentFixture<BlockGetPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockGetPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockGetPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
