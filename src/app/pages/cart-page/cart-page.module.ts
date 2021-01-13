import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartPageRoutingModule } from './cart-page-routing.module';
import { CartPageComponent } from './cart-page.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../footer/footer.module';
import { CartModule } from '../../cart/cart.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    CartModule,
    RecentlyViewedProductsModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ]
})
export class CartPageModule { }
