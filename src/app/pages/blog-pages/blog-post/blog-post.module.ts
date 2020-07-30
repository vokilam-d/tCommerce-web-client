import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogPostRoutingModule } from './blog-post-routing.module';
import { BlogPostComponent } from './blog-post.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { BlogToolbarModule } from '../../../blog-toolbar/blog-toolbar.module';
import { FooterModule } from '../../../footer/footer.module';
import { MediaGalleryModule } from '../../../media-gallery/media-gallery.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { ButtonUpModule } from '../../../button-up/button-up.module';


@NgModule({
  declarations: [BlogPostComponent],
  imports: [
    CommonModule,
    BlogPostRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    BlogToolbarModule,
    FooterModule,
    MediaGalleryModule,
    RecentlyViewedProductsModule,
    ButtonUpModule
  ]
})
export class BlogPostModule { }
