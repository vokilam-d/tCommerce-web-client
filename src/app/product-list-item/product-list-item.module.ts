import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './product-list-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { ProductVariantsModule } from '../product-variants/product-variants.module';


@NgModule({
  declarations: [ProductListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RatingStarsModule,
    ProductVariantsModule
  ],
  exports: [
    ProductListItemComponent
  ]
})
export class ProductListItemModule { }
