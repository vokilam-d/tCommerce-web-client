import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { ProductService } from '../services/product.service';
import { DeviceService } from '../../../services/device-detector/device.service';

@Component({
  selector: 'product-rating',
  templateUrl: './product-rating.component.html',
  styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent implements OnInit {

  error: string | null = null;
  success: boolean = false;
  showTooltip: boolean = false;
  quickReview: number;

  @Input() productId: string;
  @Input() reviewsAvgRating: number;
  @Input() allReviewsCount: number;
  @Output() reviewsUpdated: EventEmitter<{ reviewsAvgRating: number, allReviewsCount: number }> = new EventEmitter();

  constructor(
    private productService: ProductService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.setSavedTooltipState();
  }

  private setSavedTooltipState() {
    if (this.deviceService.isPlatformServer()) { return; }

    const isTooltipClosed = !!localStorage.getItem('isTooltipClosed');
    if (isTooltipClosed) {
      return;
    }

    let viewCount = JSON.parse(localStorage.getItem('productRatingViewCount')) || 0;
    viewCount++;
    localStorage.setItem('productRatingViewCount', viewCount);
    if (viewCount <= 2) {
      return;
    }

    setTimeout(() => {
      this.showTooltip = true;
    }, 3000);

    setTimeout(() => {
      this.closeTooltip();
    }, 9000);
  }

  setQuickReview(rating: number) {
    this.closeTooltip();
    this.quickReview = rating;
  }

  addQuickReview(rating: number) {
    this.error = null;

    this.productService.addQuickReview(this.productId, rating).subscribe(
      response => {
        const { allReviewsCount, reviewsAvgRating } = response.data;

        this.reviewsUpdated.next({ allReviewsCount, reviewsAvgRating })
        this.success = true;

      },
      error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
    );

    this.quickReview = null;
  }

  closeTooltip() {
    this.showTooltip = false;
    localStorage.setItem('isTooltipClosed', 'true');
  }
}
