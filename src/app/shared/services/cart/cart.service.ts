import { Injectable } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product: ProductDto, qty: number) {
    console.log('add to cart', product, qty);
  }
}
