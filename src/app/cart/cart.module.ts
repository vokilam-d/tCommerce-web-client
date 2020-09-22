import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CrossSellProductsComponent } from './cross-sell-products/cross-sell-products.component';
import { ProductListItemModule } from '../product-list-item/product-list-item.module';
import { ProductsPreviewModule } from '../products-preview/products-preview.module';


@NgModule({
  declarations: [CartComponent, CrossSellProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProductListItemModule,
    ProductsPreviewModule
  ],
  exports: [CartComponent]
})
export class CartModule { }
