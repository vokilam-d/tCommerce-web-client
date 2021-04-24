import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { CallbackNeededComponent } from './callback-needed/callback-needed.component';
import { OrderNoteComponent } from './order-note/order-note.component';
import { RecipientAddressComponent } from './recipient-address/recipient-address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddressFormModule } from '../../address-form/address-form.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerContactInfoModule } from '../../customer-contact-info/customer-contact-info.module';
import { RecipientContactInfoModule } from '../../recipient-contact-info/recipient-contact-info.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    PaymentMethodsComponent,
    CallbackNeededComponent,
    OrderNoteComponent,
    RecipientAddressComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AddressFormModule,
    LangRouterLinkModule,
    TranslateModule.forChild(),
    CustomerContactInfoModule,
    RecipientContactInfoModule
  ],
  providers: []
})
export class CheckoutModule { }
