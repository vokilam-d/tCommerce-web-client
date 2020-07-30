import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';
import { BlogToolbarModule } from '../../../blog-toolbar/blog-toolbar.module';
import { BlogPostsListModule } from '../../../blog-posts-list/blog-posts-list.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { ButtonUpModule } from '../../../button-up/button-up.module';


@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    BlogToolbarModule,
    BlogPostsListModule,
    RecentlyViewedProductsModule,
    ButtonUpModule
  ]
})
export class BlogModule { }
