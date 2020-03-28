import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNoteComponent } from './order-note.component';

describe('OrderNoteComponent', () => {
  let component: OrderNoteComponent;
  let fixture: ComponentFixture<OrderNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
