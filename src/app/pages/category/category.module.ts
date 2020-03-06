import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { CommonModule } from '@angular/common';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FilterModule } from '../../filter/filter.module';
import { SortingModule } from '../../sorting/sorting.module';
import { ProductListItemModule } from '../../category-item/product-list-item.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CategoryRoutingModule,
    HeaderModule,
    FooterModule,
    CommonModule,
    BreadcrumbsModule,
    FilterModule,
    SortingModule,
    ProductListItemModule
  ]
})
export class CategoryModule { }
