import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { KeyValue } from '@angular/common';
import { ScrollToService } from '../../../shared/services/scroll-to/scroll-to.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: ProductDto;
  indices = {
    description: 0,
    chars: 1,
    reviews: 2
  };
  activeIdx: number = 0;

  reviews: [];

  constructor(private http: HttpClient,
              private scrollToService: ScrollToService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    if (this.product.reviewsCount > 0) {
      this.fetchReviews();
    }
  }

  openReviews() {
    this.toggleContent(this.indices.reviews);
  }

  private fetchReviews() {
    this.reviews = [];
  }

  toggleContent(idx: number, force: boolean = false) {
    if (!force && this.activeIdx === idx) {
      this.activeIdx = null;
      return;
    }

    this.activeIdx = idx;
    this.scrollToService.scrollTo({ target: this.elementRef, offset: -20 });
  }

  keyValuePipeComparator(a: KeyValue<string, number>, b: KeyValue<string, number>): number {
    return a.value - b.value;
  }
}
