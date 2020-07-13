import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.scss']
})
export class RecentlyViewedProductsComponent implements OnInit {

  recentlyViewedProducts: Array<number>;

  constructor() { }

  ngOnInit(): void {
    this.getProductsFromLocalStorage();
  }

  getProductsFromLocalStorage() {
    this.recentlyViewedProducts = JSON.parse(localStorage.getItem('recentlyViewedProducts'));
  }

}
