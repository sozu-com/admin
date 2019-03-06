import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSettingsComponent } from './default-settings.component';

describe('DefaultSettingsComponent', () => {
  let component: DefaultSettingsComponent;
  let fixture: ComponentFixture<DefaultSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
