import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogCategoryRoutingModule } from './blog-category-routing.module';
import { BlogCategoryComponent } from './blog-category.component';
import { BlogToolbarModule } from '../../../blog-toolbar/blog-toolbar.module';
import { BlogPostsListModule } from '../../../blog-posts-list/blog-posts-list.module';
import { FooterModule } from '../../../footer/footer.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { HeaderModule } from '../../../header/header.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { ButtonUpModule } from '../../../button-up/button-up.module';


@NgModule({
  declarations: [BlogCategoryComponent],
  imports: [
    CommonModule,
    BlogCategoryRoutingModule,
    BlogToolbarModule,
    BlogPostsListModule,
    FooterModule,
    BreadcrumbsModule,
    HeaderModule,
    RecentlyViewedProductsModule,
    ButtonUpModule
  ]
})
export class BlogCategoryModule { }
