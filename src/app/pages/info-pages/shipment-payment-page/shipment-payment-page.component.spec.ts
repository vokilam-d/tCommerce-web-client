import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentPaymentPageComponent } from './shipment-payment-page.component';

describe('ShipmentPaymentPageComponent', () => {
  let component: ShipmentPaymentPageComponent;
  let fixture: ComponentFixture<ShipmentPaymentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentPaymentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
