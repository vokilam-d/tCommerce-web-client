import { Injectable } from '@angular/core';
import { ProductDto } from '../../shared/dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor() { }

  addToWishlist(product: ProductDto) {
    console.log('added to wishlist', product)
  }
}
