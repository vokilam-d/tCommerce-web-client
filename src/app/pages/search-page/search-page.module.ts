import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ProductListModule } from '../../product-list/product-list.module';
import { FooterModule } from '../../footer/footer.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    SearchPageRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    ProductListModule,
    FooterModule,
    RecentlyViewedProductsModule,
    TranslateModule.forChild()
  ]
})
export class SearchPageModule { }
