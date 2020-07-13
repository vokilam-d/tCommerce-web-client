import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyViewedProductsComponent } from './recently-viewed-products.component';
import { ProductsPreviewModule } from '../products-preview/products-preview.module';



@NgModule({
  declarations: [RecentlyViewedProductsComponent],
  exports: [
    RecentlyViewedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsPreviewModule
  ]
})
export class RecentlyViewedProductsModule { }
