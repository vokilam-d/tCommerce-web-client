import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, AfterViewInit {

  ratingBarElParams: any;
  ratingOnHover: number;

  @Input() rating: number;
  @Input() size: 'default' | 'small' = 'default';
  @Input() isDisabled: boolean = false;

  @Output() quickReview = new EventEmitter<number>();

  @ViewChild('stopElement') stopElement: ElementRef;
  @ViewChild('stopElementGray') stopElementGray: ElementRef;
  @ViewChild('pathElement') pathElement: ElementRef;
  @ViewChild('ratingBarElement') ratingBarElement: ElementRef;


  constructor( private renderer: Renderer2 ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${this.rating / 5}`);
    this.renderer.setAttribute(this.pathElement.nativeElement, 'fill', `url(#${this.getFillId()})`);

    this.ratingBarElParams = this.getRatingBarParams();
  }

  getFillId() {
    return `rating-${this.rating}`;
  }

  getRatingBarParams() {
    const ratingBarEl = this.ratingBarElement.nativeElement;
    return {
      left: ratingBarEl.getBoundingClientRect().left,
      width: ratingBarEl.getBoundingClientRect().width,
    }
  }

  onMouseMove(e) {
    if (this.isDisabled) {
      return;
    }

    const cursorPositionX = e.clientX;
    const ratingBarElLeftPosition = this.ratingBarElParams.left;
    const ratingBarElWidth = this.ratingBarElParams.width;
    const starsWidthOnHover = cursorPositionX - ratingBarElLeftPosition;

    const starWidth = ratingBarElWidth / 5;
    this.ratingOnHover = Math.ceil(starsWidthOnHover / starWidth);

    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${this.ratingOnHover / 5}`);
  }

  onMouseLeave() {
    if (this.isDisabled) {
      return;
    }

    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${this.rating / 5}`);
  }

  onClick() {
    if (this.isDisabled) {
      return;
    }

    this.quickReview.emit(this.ratingOnHover);
  }

}
