import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CallbackNeededComponent } from './callback-needed/callback-needed.component';
import { OrderNoteComponent } from './order-note/order-note.component';
import { OrderCustomerInfoComponent } from './order-customer-info/order-customer-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddressFormModule } from '../../address-form/address-form.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentMethodsComponent,
    CallbackNeededComponent,
    OrderNoteComponent,
    OrderCustomerInfoComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AddressFormModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class CheckoutModule { }
