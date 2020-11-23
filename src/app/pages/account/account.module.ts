import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../footer/footer.module';
import { AccountCustomerInfoComponent } from './customer-info/account-customer-info.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';
import { AccountDiscountComponent } from './account-discount/account-discount.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressFormModule } from '../../address-form/address-form.module';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AccountComponent,
    AccountCustomerInfoComponent,
    WishlistComponent,
    AddressesComponent,
    AccountReviewsComponent,
    AccountDiscountComponent,
    AccountOrdersComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    SharedModule,
    ReactiveFormsModule,
    AddressFormModule,
    NgxMaskModule
  ]
})
export class AccountModule { }
