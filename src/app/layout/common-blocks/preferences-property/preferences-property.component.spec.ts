import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesPropertyComponent } from './preferences-property.component';

describe('PreferencesPropertyComponent', () => {
  let component: PreferencesPropertyComponent;
  let fixture: ComponentFixture<PreferencesPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
