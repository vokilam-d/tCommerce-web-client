import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';
import { MediaGalleryModalComponent } from '../media-gallery-modal/media-gallery-modal.component';
import { UPLOADED_HOST } from '../shared/constants';
import { EMediaVariant } from '../shared/enums/media-variant.enum';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;
  @Input() medias: MediaDto[] = [];
  @Input() thumbnailProp: EMediaVariant = EMediaVariant.Small;
  @Input() imageForModalProp: EMediaVariant = EMediaVariant.Large;

  @ViewChild(MediaGalleryModalComponent) mediaModalCmp: MediaGalleryModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onMediaClick(index: number) {
    this.mediaModalCmp.openModal(index);
  }
}
