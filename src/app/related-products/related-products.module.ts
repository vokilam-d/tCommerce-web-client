import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedProductsComponent } from './related-products.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RelatedProductsComponent],
  imports: [
    CommonModule,
    ProductListItemModule,
    SharedModule
  ],
  exports: [RelatedProductsComponent]
})
export class RelatedProductsModule { }
