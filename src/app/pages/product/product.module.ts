import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { ProductRatingModule } from '../../product-rating/product-rating.module';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { MediaGalleryModalComponent } from './media-gallery-modal/media-gallery-modal.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent, MediaGalleryComponent, MediaGalleryModalComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule,
    ProductRatingModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
