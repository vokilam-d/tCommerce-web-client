import { Component, OnInit } from '@angular/core';
import { ProductService } from '../pages/product/services/product.service';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { onWindowLoad } from '../shared/helpers/on-window-load.function';

@Component({
  selector: 'recently-added-products',
  templateUrl: './recently-added-products.component.html',
  styleUrls: ['./recently-added-products.component.scss']
})
export class RecentlyAddedProductsComponent implements OnInit {

  recentlyAddedProducts: ProductListItemDto[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    onWindowLoad(this, this.fetchRecentlyAddedProducts);
  }

  private fetchRecentlyAddedProducts() {
    this.productService.fetchRecentlyAddedProducts().subscribe(
      response => {
        this.recentlyAddedProducts = response.data;
      }
    );
  }

}
