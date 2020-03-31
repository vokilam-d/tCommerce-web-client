import { Component, Input, OnInit } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../shared/services/customer/customer.service';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../shared/constants';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  uploadedHost = API_HOST;
  error: string | null = null;
  isLoading: boolean = false;
  @Input() item: ProductListItemDto;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  addToCart() {
    this.error = null;
    this.isLoading = true;

    this.customerService.addToCart(this.item, 1)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => { },
        error => {
          this.error = error.error ? error.error.message : DEFAULT_ERROR_TEXT;
        }
      );
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }
}
