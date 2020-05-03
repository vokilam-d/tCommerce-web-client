import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { ReviewGalleryModule } from '../review-gallery/review-gallery.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    RatingStarsModule,
    ReviewGalleryModule,
    FormsModule
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }
