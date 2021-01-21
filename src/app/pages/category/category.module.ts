import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ProductListModule } from '../../product-list/product-list.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { LinkedCategoriesModule } from '../../linked-categories/linked-categories.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CategoryRoutingModule,
    HeaderModule,
    FooterModule,
    CommonModule,
    BreadcrumbsModule,
    ProductListModule,
    RecentlyViewedProductsModule,
    LinkedCategoriesModule,
    LangRouterLinkModule
  ]
})
export class CategoryModule { }
