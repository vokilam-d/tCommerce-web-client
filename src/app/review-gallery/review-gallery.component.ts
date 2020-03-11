import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';
import { MediaGalleryModalComponent } from '../media-gallery-modal/media-gallery-modal.component';

@Component({
  selector: 'review-gallery',
  templateUrl: './review-gallery.component.html',
  styleUrls: ['./review-gallery.component.scss']
})
export class ReviewGalleryComponent implements OnInit {

  @Input() medias: MediaDto[] = [];
  @ViewChild(MediaGalleryModalComponent) mediaModalCmp: MediaGalleryModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onMediaClick(index: number) {
    this.mediaModalCmp.openModal(index);
  }
}
