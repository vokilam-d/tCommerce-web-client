import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaDto } from '../../../shared/dtos/media.dto';
import { MediaGalleryModalComponent } from '../../../media-gallery-modal/media-gallery-modal.component';
import { API_HOST } from '../../../shared/constants';

@Component({
  selector: 'product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  uploadedHost = API_HOST;
  activeMediaIdx: number = 0;

  @Input() medias: MediaDto[] = [];
  @ViewChild(MediaGalleryModalComponent) mediaModalCmp: MediaGalleryModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  setActiveIndex(index: number) {
    this.activeMediaIdx = index;
  }

  onMediaClick(index: number) {
    this.setActiveIndex(index);
    this.mediaModalCmp.openModal(index);
  }
}
