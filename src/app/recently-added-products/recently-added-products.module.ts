import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentlyAddedProductsComponent } from './recently-added-products.component';
import { ProductsPreviewModule } from '../products-preview/products-preview.module';



@NgModule({
  declarations: [RecentlyAddedProductsComponent],
  exports: [
    RecentlyAddedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsPreviewModule
  ]
})
export class RecentlyAddedProductsModule { }
