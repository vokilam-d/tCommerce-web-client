import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingStarsComponent } from './rating-stars.component';



@NgModule({
  declarations: [RatingStarsComponent],
  imports: [
    CommonModule
  ],
  exports: [RatingStarsComponent]
})
export class RatingStarsModule { }
