import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  Renderer2, SimpleChanges
} from '@angular/core';
import { Range } from '../../shared/dtos/filter.dto';
import { isTouchDevice } from '../../shared/helpers/is-touch-device.function';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeSliderComponent implements OnInit, OnChanges {

  newSelected: Range = { min: 0, max: 0 };

  @Input() range: Range;
  @Input() selected: Range;
  @Output() valueChanged = new EventEmitter<Range>();

  constructor(private renderer: Renderer2,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const selected: Range = changes?.selected.currentValue;
    if (selected) {
      this.newSelected.min = selected.min;
      this.newSelected.max = selected.max;
    }
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
    return (this.newSelected[btn] - this.range.min) / (this.range.max - this.range.min) * 100;
  }

  submit() {
    this.valueChanged.emit(this.newSelected);
  }

  startMove(downEvt: TouchEvent | MouseEvent, btn: 'min' | 'max') {
    const isTouch = isTouchDevice();

    const startX = isTouch ? (downEvt as TouchEvent).touches[0].clientX : (downEvt as MouseEvent).clientX;
    const startedSelectedMin = this.selected.min;
    const startedSelectedMax = this.selected.max;

    const parent = (downEvt.target as HTMLElement).offsetParent as HTMLElement;
    let { left: parentMinX, right: parentMaxX } = parent.getBoundingClientRect();
    let { left: containerMinX, right: containerMaxX } = parent.offsetParent.getBoundingClientRect();

    const moveEventName = isTouch ? 'touchmove' : 'mousemove';
    const upEventName = isTouch ? 'touchend' : 'mouseup';

    const moveUnlisten = this.renderer.listen('window', moveEventName, evt => {
      const moveX = isTouch ? (evt as TouchEvent).touches[0].clientX : (evt as MouseEvent).clientX;
      const diffX = moveX - startX;
      const offsetRate = diffX / (parentMaxX - parentMinX);
      if (offsetRate === 0) { return; }

      switch (btn) {
        case 'min':
          if (moveX <= containerMinX) {
            this.newSelected.min = this.range.min;
          } else {
            const newValue = startedSelectedMin + Math.round((this.range.max - this.range.min) * offsetRate);

            if (newValue >= this.selected.max) {
              this.newSelected.min = this.selected.max - 1;
            } else if (newValue <= this.range.min) {
              this.newSelected.min = this.range.min;
            } else {
              this.newSelected.min = newValue;
            }
          }
          break;

        case 'max':
          if (moveX >= containerMaxX) {
            this.newSelected.max = this.range.max;
          } else {
            const newValue = startedSelectedMax + Math.round((this.range.max - this.range.min) * offsetRate);

            if (newValue <= this.selected.min) {
              this.newSelected.max = this.selected.min + 1;
            } else if (newValue >= this.range.max) {
              this.newSelected.max = this.range.max;
            } else {
              this.newSelected.max = newValue;
            }
          }
          break;
      }

      this.cdr.markForCheck();
    });

    const upUnlisten = this.renderer.listen('window', upEventName, _ => {
      this.submit();

      moveUnlisten();
      upUnlisten();
    });
  }
}
