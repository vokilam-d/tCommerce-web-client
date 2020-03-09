import { Component, Input, OnInit } from '@angular/core';
import { MediaDto } from '../../../shared/dtos/media.dto';

@Component({
  selector: 'media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {

  activeMediaIdx: number = 0;
  isModalVisible: boolean = false;

  @Input() medias: MediaDto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  setActiveIndex(index: number) {
    this.activeMediaIdx = index;
  }

  onMediaClick(index: number) {
    this.setActiveIndex(index);
    this.isModalVisible = true;
  }

  hideModal() {
    this.isModalVisible = false;
  }
}
