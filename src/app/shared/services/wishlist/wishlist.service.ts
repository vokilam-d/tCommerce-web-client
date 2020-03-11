import { Injectable } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  addToWishlist(product: ProductDto) {
    console.log('added to wishlist', product)
  }
}
