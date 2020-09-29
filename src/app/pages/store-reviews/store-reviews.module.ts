import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewsRoutingModule } from './store-reviews-routing.module';
import { StoreReviewsComponent } from './store-reviews.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../footer/footer.module';
import { AddReviewModalModule } from '../../add-review-modal/add-review-modal.module';
import { ReviewModule } from '../../review/review.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { RatingStarsModule } from '../../rating-stars/rating-stars.module';
import { PaginationModule } from '../../pagination/pagination.module';
import { ProductListModule } from '../../product-list/product-list.module';


@NgModule({
  declarations: [StoreReviewsComponent],
  imports: [
    CommonModule,
    StoreReviewsRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    AddReviewModalModule,
    ReviewModule,
    RecentlyViewedProductsModule,
    RatingStarsModule,
    PaginationModule,
    ProductListModule
  ]
})
export class StoreReviewsModule { }
