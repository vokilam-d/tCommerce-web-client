import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepaymentsRoutingModule } from './repayments-routing.module';
import { RepaymentsComponent } from './repayments.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { ButtonUpModule } from '../../../button-up/button-up.module';


@NgModule({
  declarations: [RepaymentsComponent],
  imports: [
    CommonModule,
    RepaymentsRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    RecentlyViewedProductsModule,
    ButtonUpModule
  ]
})
export class RepaymentsModule { }
