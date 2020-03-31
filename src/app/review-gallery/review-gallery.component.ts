import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';
import { MediaGalleryModalComponent } from '../media-gallery-modal/media-gallery-modal.component';
import { API_HOST } from '../shared/constants';

@Component({
  selector: 'review-gallery',
  templateUrl: './review-gallery.component.html',
  styleUrls: ['./review-gallery.component.scss']
})
export class ReviewGalleryComponent implements OnInit {

  uploadedHost = API_HOST;
  @Input() medias: MediaDto[] = [];
  @ViewChild(MediaGalleryModalComponent) mediaModalCmp: MediaGalleryModalComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onMediaClick(index: number) {
    this.mediaModalCmp.openModal(index);
  }
}
