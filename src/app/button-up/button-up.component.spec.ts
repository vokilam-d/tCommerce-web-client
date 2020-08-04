import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUpComponent } from './button-up.component';

describe('ButtonUpComponent', () => {
  let component: ButtonUpComponent;
  let fixture: ComponentFixture<ButtonUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
