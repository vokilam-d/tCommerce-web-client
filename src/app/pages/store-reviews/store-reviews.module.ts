import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewsRoutingModule } from './store-reviews-routing.module';
import { StoreReviewsComponent } from './store-reviews.component';


@NgModule({
  declarations: [StoreReviewsComponent],
  imports: [
    CommonModule,
    StoreReviewsRoutingModule
  ]
})
export class StoreReviewsModule { }
