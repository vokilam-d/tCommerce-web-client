import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { PostsPreviewComponent } from './posts-preview/posts-preview.component';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { RecentlyAddedProductsModule } from '../../recently-added-products/recently-added-products.module';

@NgModule({
  declarations: [IndexComponent, PostsPreviewComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    HeaderModule,
    FooterModule,
    RecentlyViewedProductsModule,
    RecentlyAddedProductsModule
  ]
})
export class IndexModule { }
