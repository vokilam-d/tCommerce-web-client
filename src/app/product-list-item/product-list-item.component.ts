import { Component, Input, OnInit } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../shared/services/customer/customer.service';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  isLoading: boolean = false;
  @Input() item: ProductListItemDto;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  addToCart() {
    this.isLoading = true;

    this.customerService.addToCart(this.item, 1)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe();
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }
}
