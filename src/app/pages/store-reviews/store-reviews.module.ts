import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewsRoutingModule } from './store-reviews-routing.module';
import { StoreReviewsComponent } from './store-reviews.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../footer/footer.module';
import { AddReviewModule } from '../../add-review/add-review.module';
import { ReviewModule } from '../../review/review.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { RatingStarsModule } from '../../rating-stars/rating-stars.module';
import { PaginationModule } from '../../pagination/pagination.module';
import { ProductListModule } from '../../product-list/product-list.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [StoreReviewsComponent],
  imports: [
    CommonModule,
    StoreReviewsRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    AddReviewModule,
    ReviewModule,
    RecentlyViewedProductsModule,
    RatingStarsModule,
    PaginationModule,
    ProductListModule,
    TranslateModule
  ]
})
export class StoreReviewsModule { }
