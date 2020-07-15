import { Component, OnInit } from '@angular/core';
import { ProductService } from '../pages/product/product.service';
import { DeviceService } from '../shared/services/device-detector/device.service';

@Component({
  selector: 'recently-viewed-products',
  templateUrl: './recently-viewed-products.component.html',
  styleUrls: ['./recently-viewed-products.component.scss']
})
export class RecentlyViewedProductsComponent implements OnInit {

  recentlyViewedProducts: number[];

  constructor(private productService: ProductService,
              private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    if (this.deviceService.isPlatformBrowser()) {
      this.recentlyViewedProducts = this.productService.getViewedProductsFromLocalStorage();
    }
  }

}
