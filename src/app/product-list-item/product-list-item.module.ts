import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './product-list-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { ProductVariantsModule } from '../product-variants/product-variants.module';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ProductListItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    RatingStarsModule,
    ProductVariantsModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ],
  exports: [
    ProductListItemComponent
  ]
})
export class ProductListItemModule { }
