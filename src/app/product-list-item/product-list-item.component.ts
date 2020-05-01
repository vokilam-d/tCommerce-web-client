import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../shared/services/customer/customer.service';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../shared/constants';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit, OnChanges {

  uploadedHost = API_HOST;
  error: string | null = null;
  isLoading: boolean = false;
  discountValue: number;
  @Input() item: ProductListItemDto;

  constructor(private customerService: CustomerService) { }

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

    this.customerService.addToCart(this.item, 1)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => { },
        error => {
          this.error = error.error?.message || DEFAULT_ERROR_TEXT;
        }
      );
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }
}
