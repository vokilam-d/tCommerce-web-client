import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaGalleryModalComponent } from './media-gallery-modal.component';


@NgModule({
  declarations: [MediaGalleryModalComponent],
  imports: [
    CommonModule
  ],
  exports: [MediaGalleryModalComponent]
})
export class MediaGalleryModalModule { }
