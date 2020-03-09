import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit, AfterViewInit{

  @Input() rating: number;
  @Input() reviewsCount: number;

  @ViewChild('stopElement') stopElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.stopElement.nativeElement, 'offset', `${this.rating / 5}`);
  }

}
