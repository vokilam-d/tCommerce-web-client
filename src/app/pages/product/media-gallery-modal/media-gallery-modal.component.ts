import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { MediaDto } from '../../../shared/dtos/media.dto';

@Component({
  selector: 'media-gallery-modal',
  templateUrl: './media-gallery-modal.component.html',
  styleUrls: ['./media-gallery-modal.component.scss']
})
export class MediaGalleryModalComponent implements OnInit, OnDestroy {

  private unlisten: () => void;

  @Input() activeMediaIdx: number = 0;
  @Input() medias: MediaDto[] = [];
  @Output('close') closeEmitter = new EventEmitter();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.unlisten = this.renderer.listen('window', 'keyup', event => this.onKeyPress(event));
  }

  ngOnDestroy(): void {
    this.unlisten();
  }

  close() {
    this.closeEmitter.emit();
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
        this.close();
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
