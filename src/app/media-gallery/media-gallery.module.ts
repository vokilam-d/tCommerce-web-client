import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaGalleryComponent } from './media-gallery.component';
import { MediaGalleryModalModule } from '../media-gallery-modal/media-gallery-modal.module';


@NgModule({
  declarations: [MediaGalleryComponent],
  imports: [
    CommonModule,
    MediaGalleryModalModule
  ],
  exports: [MediaGalleryComponent]
})
export class MediaGalleryModule { }
