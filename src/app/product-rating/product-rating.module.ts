import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating.component';



@NgModule({
  declarations: [ProductRatingComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductRatingComponent]
})
export class ProductRatingModule { }
