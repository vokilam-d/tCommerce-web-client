import { Component, OnInit } from '@angular/core';
import { ProductService } from '../pages/product/product.service';
import { onWindowLoad } from '../shared/helpers/on-window-load.function';

@Component({
  selector: 'recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.scss']
})
export class RecentlyViewedProductsComponent implements OnInit {

  recentlyViewedProducts: number[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    onWindowLoad(this, this.init);
  }

  private init() {
    this.recentlyViewedProducts = this.productService.getViewedProductsFromLocalStorage();
  }
}
