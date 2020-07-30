import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsComponent } from './discounts.component';
import { HeaderModule } from '../../../header/header.module';
import { FooterModule } from '../../../footer/footer.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { ButtonUpModule } from '../../../button-up/button-up.module';


@NgModule({
  declarations: [DiscountsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule,
    RecentlyViewedProductsModule,
    ButtonUpModule
  ]
})
export class DiscountsModule { }
