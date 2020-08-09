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
    const starsWidthOnHover = cursorPositionX - ratingBarElLeftPosition;

    const starWidth = ratingBarElWidth / 5;
    const starNumber = Math.ceil(starsWidthOnHover / starWidth);

    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${starNumber / 5}`);
  }

  onMouseLeave() {
    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', '0');
  }

}

// убирать курсор - изначальный рейтинг
// клик - бекэнд запрос с рейтингом от 1 до 5 эмитит событие на клик родителю
// бекэнд отправляет родитель
