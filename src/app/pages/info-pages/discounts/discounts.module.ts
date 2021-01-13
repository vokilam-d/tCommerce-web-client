import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsComponent } from './discounts.component';
import { HeaderModule } from '../../../header/header.module';
import { FooterModule } from '../../../footer/footer.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { LangRouterLinkModule } from '../../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [DiscountsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule,
    RecentlyViewedProductsModule,
    LangRouterLinkModule,
    TranslateModule
  ]
})
export class DiscountsModule { }
