import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MediaDto } from '../shared/dtos/media.dto';
import { UPLOADED_HOST } from '../shared/constants';
import { EMediaVariant } from '../shared/enums/media-variant.enum';
import { PreventScrollService } from '../services/prevent-scroll/prevent-scroll.service';

@Component({
  selector: 'media-gallery-modal',
  templateUrl: './media-gallery-modal.component.html',
  styleUrls: ['./media-gallery-modal.component.scss']
})
export class MediaGalleryModalComponent implements OnInit, OnDestroy {

  uploadedHost = UPLOADED_HOST;
  isModalVisible: boolean = false;
  private unlisten: () => void;

  activeMediaIdx: number = 0;
  @Input() medias: MediaDto[] = [];
  @Input() imageForModalProp: EMediaVariant = EMediaVariant.Large;

  constructor(
    private renderer: Renderer2,
    private preventScrollService: PreventScrollService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.unlisten) { this.unlisten(); }
    this.preventScrollService.isEnabled$.next(false);
  }

  openModal(activeMediaIdx: number = 0) {
    this.activeMediaIdx = activeMediaIdx;
    this.isModalVisible = true;
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
    this.preventScrollService.isEnabled$.next(true);
  }

  closeModal() {
    if (this.unlisten) { this.unlisten(); }
    this.isModalVisible = false;
    this.preventScrollService.isEnabled$.next(false);
  }

  private onKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'Escape':
        this.closeModal();
        break;
    }
  }

  next() {
    if (this.activeMediaIdx === this.medias.length - 1) {
      this.activeMediaIdx = 0;
    } else {
      this.activeMediaIdx++;
    }
  }

  prev() {
    if (this.activeMediaIdx === 0) {
      this.activeMediaIdx = this.medias.length - 1;
    } else {
      this.activeMediaIdx--;
    }
  }
}
