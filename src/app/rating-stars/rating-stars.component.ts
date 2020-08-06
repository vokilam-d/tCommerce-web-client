import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, AfterViewInit {

  ratingBarElParams: any;

  @Input() rating: number;
  @Input() size: 'default' | 'small' = 'default';

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
    const cursorPositionX = e.clientX;
    const ratingBarElLeftPosition = this.ratingBarElParams.left;
    const ratingBarElWidth = this.ratingBarElParams.width;
    const starWidth = ratingBarElWidth / 5;

    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${ (cursorPositionX - ratingBarElLeftPosition) / (5 * starWidth)}`);
  }

}
