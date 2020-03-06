import { Component, Input, OnInit } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';

@Component({
  selector: 'product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss']
})
export class ProductListItemComponent implements OnInit {

  @Input() item: ProductListItemDto;

  constructor() { }

  ngOnInit() {
  }

  buy() {
    console.log('buy!', this.item);
  }

  addToWishlist() {
    console.log('add to wishlist!', this.item);
  }
}
