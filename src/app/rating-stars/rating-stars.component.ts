import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss']
})
export class RatingStarsComponent implements OnInit, AfterViewInit {

  @Input() rating: number;

  @ViewChild('stopElement') stopElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${this.rating / 5}`);
  }
}
