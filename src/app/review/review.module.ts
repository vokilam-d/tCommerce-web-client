import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { RatingStarsModule } from '../rating-stars/rating-stars.module';
import { MediaGalleryModule } from '../media-gallery/media-gallery.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    RatingStarsModule,
    MediaGalleryModule,
    FormsModule,
    TranslateModule
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }
