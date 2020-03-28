import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackNeededComponent } from './callback-needed.component';

describe('CallbackNeededComponent', () => {
  let component: CallbackNeededComponent;
  let fixture: ComponentFixture<CallbackNeededComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallbackNeededComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackNeededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
