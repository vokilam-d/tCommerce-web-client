import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { RatingStarsModule } from '../../rating-stars/rating-stars.module';
import { ProductGalleryComponent } from './product-gallery/product-gallery.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { AddReviewModule } from '../../add-review/add-review.module';
import { MediaGalleryModalModule } from '../../media-gallery-modal/media-gallery-modal.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsPreviewModule } from '../../products-preview/products-preview.module';
import { ReviewModule } from '../../review/review.module';
import { RecentlyViewedProductsModule } from '../../recently-viewed-products/recently-viewed-products.module';
import { LinkedCategoriesModule } from '../../linked-categories/linked-categories.module';
import { AggregatedProductsComponent } from './aggregated-products/aggregated-products.component';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { ProductVariantsModule } from '../../product-variants/product-variants.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ProductComponent, ProductGalleryComponent, ProductDetailsComponent, AggregatedProductsComponent, AdditionalServicesComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule,
    RatingStarsModule,
    FormsModule,
    AddReviewModule,
    MediaGalleryModalModule,
    ProductsPreviewModule,
    ReviewModule,
    RecentlyViewedProductsModule,
    LinkedCategoriesModule,
    ProductVariantsModule,
    LangRouterLinkModule,
    TranslateModule
  ]
})
export class ProductModule { }
