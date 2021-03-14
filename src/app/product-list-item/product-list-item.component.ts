import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../services/customer/customer.service';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../shared/constants';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { ProductLabelTypeEnum } from '../shared/enums/product-label-type.enum';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit, OnChanges {

  uploadedHost = UPLOADED_HOST;
  error: string | null = null;
  isLoading: boolean = false;
  discountValue: number;
  @Input() item: ProductListItemDto;
  @Input() parentNameForAnalytics: string;

  constructor(private customerService: CustomerService,
              private analyticsService: AnalyticsService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const item: ProductListItemDto = changes.item?.currentValue;
    if (item && item.oldPrice && !this.discountValue) {
      this.discountValue = Math.ceil((this.item.oldPrice - this.item.price) / this.item.oldPrice * 100);
    }
  }

  addToCart() {
    this.error = null;
    this.isLoading = true;

    this.customerService.addToCart(this.item.sku, 1)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => { },
        error => {
          this.error = error.error?.message || DEFAULT_ERROR_TEXT;
        }
      );

    this.analyticsService.addToCart(this.item.sku, this.item.name, this.item.price, this.parentNameForAnalytics);
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }

  setItemThumbnail() {
    if (!this.item.mediaUrl) {
      return '/assets/images/no-img.jpg';
    } else {
      return this.uploadedHost + this.item.mediaUrl;
    }
  }

  public getLabelClass() {
    switch (this.item.label.type) {
      case ProductLabelTypeEnum.New:
        return 'item__label--new';
      case ProductLabelTypeEnum.Top:
        return 'item__label--top';
    }
  }

}
