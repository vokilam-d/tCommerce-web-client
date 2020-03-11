import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewGalleryComponent } from './review-gallery.component';
import { MediaGalleryModalModule } from '../media-gallery-modal/media-gallery-modal.module';


@NgModule({
  declarations: [ReviewGalleryComponent],
  imports: [
    CommonModule,
    MediaGalleryModalModule
  ],
  exports: [ReviewGalleryComponent]
})
export class ReviewGalleryModule { }
