import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import { Range } from '../../shared/dtos/filter.dto';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeSliderComponent implements OnInit {

  @Input() range: Range;
  @Input() selected: Range;
  @Output() valueChanged = new EventEmitter<Range>();

  constructor(private renderer: Renderer2,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  getOffset(btn: 'min' | 'max'): number {
    const offset = this.calcOffset(btn);

    switch (btn) {
      case 'min':
        const maxOffset = this.calcOffset('max');
        if (offset >= maxOffset) {
          return maxOffset;
        } else if (offset <= 0) {
          return 0;
        } else {
          return offset;
        }

      case 'max':
        const minOffset = this.calcOffset('min');
        if (offset <= minOffset) {
          return minOffset;
        } else if (offset >= 100) {
          return 100;
        } else {
          return offset;
        }
    }
  }

  private calcOffset(btn: 'min' | 'max'): number {
    return (this.selected[btn] - this.range.min) / (this.range.max - this.range.min) * 100;
  }

  submit() {
    this.valueChanged.emit(this.selected);
  }

  startMove(downEvt: MouseEvent, btn: 'min' | 'max') {
    const startX = downEvt.clientX;
    const startedSelectedMin = this.selected.min;
    const startedSelectedMax = this.selected.max;

    const parent = (downEvt.target as HTMLElement).offsetParent as HTMLElement;
    let { left: parentMinX, right: parentMaxX } = parent.getBoundingClientRect();
    let { left: containerMinX, right: containerMaxX } = parent.offsetParent.getBoundingClientRect();

    const moveUnlisten = this.renderer.listen('window', 'mousemove', evt => {
      const moveX = evt.clientX;
      const diffX = moveX - startX;
      const offsetRate = diffX / (parentMaxX - parentMinX);
      if (offsetRate === 0) { return; }

      switch (btn) {
        case 'min':
          if (moveX <= containerMinX) {
            this.selected.min = this.range.min;
          } else {
            const newValue = startedSelectedMin + Math.round((this.range.max - this.range.min) * offsetRate);

            if (newValue >= this.selected.max) {
              this.selected.min = this.selected.max - 1;
            } else if (newValue <= this.range.min) {
              this.selected.min = this.range.min;
            } else {
              this.selected.min = newValue;
            }
          }
          break;

        case 'max':
          if (moveX >= containerMaxX) {
            this.selected.max = this.range.max;
          } else {
            const newValue = startedSelectedMax + Math.round((this.range.max - this.range.min) * offsetRate);

            if (newValue <= this.selected.min) {
              this.selected.max = this.selected.min + 1;
            } else if (newValue >= this.range.max) {
              this.selected.max = this.range.max;
            } else {
              this.selected.max = newValue;
            }
          }
          break;
      }

      this.cdr.markForCheck();
    });

    const upUnlisten = this.renderer.listen('window', 'mouseup', _ => {
      this.submit();

      moveUnlisten();
      upUnlisten();
    });
  }
}
