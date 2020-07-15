import { Component, OnInit } from '@angular/core';
import { ProductService } from '../pages/product/product.service';

@Component({
  selector: 'recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.scss']
})
export class RecentlyViewedProductsComponent implements OnInit {

  recentlyViewedProducts: number[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.recentlyViewedProducts = this.productService.getViewedProductsFromLocalStorage();
  }

}
