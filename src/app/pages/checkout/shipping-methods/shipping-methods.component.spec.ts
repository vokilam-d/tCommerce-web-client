import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMethodsComponent } from './shipping-methods.component';

describe('ShippingMethodsComponent', () => {
  let component: ShippingMethodsComponent;
  let fixture: ComponentFixture<ShippingMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
