import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { ShippingMethodsComponent } from './shipping-methods/shipping-methods.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CallbackNeededComponent } from './callback-needed/callback-needed.component';
import { OrderNoteComponent } from './order-note/order-note.component';
import { OrderCustomerInfoComponent } from './order-customer-info/order-customer-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    ShippingMethodsComponent,
    PaymentMethodsComponent,
    CallbackNeededComponent,
    OrderNoteComponent,
    OrderCustomerInfoComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: []
})
export class CheckoutModule { }
