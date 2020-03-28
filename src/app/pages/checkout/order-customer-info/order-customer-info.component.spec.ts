import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomerInfoComponent } from './order-customer-info.component';

describe('OrderCustomerInfoComponent', () => {
  let component: OrderCustomerInfoComponent;
  let fixture: ComponentFixture<OrderCustomerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustomerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCustomerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
