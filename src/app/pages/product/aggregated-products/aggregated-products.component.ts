import { Component, Input, OnInit } from '@angular/core';
import { AggregatorService } from './aggregator.service';
import { AggregatedProductsTableDto } from '../../../shared/dtos/aggregated-products-table.dto';
import { DeviceService } from '../../../services/device-detector/device.service';
import { API_HOST } from '../../../shared/constants';
import { AggregatedProductDto } from '../../../shared/dtos/aggregated-product.dto';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'aggregated-products',
  templateUrl: './aggregated-products.component.html',
  styleUrls: ['./aggregated-products.component.scss']
})
export class AggregatedProductsComponent implements OnInit {

  tables: AggregatedProductsTableDto[] = [];
  uploadedHost = API_HOST;

  @Input() productId: number;

  constructor(private aggregatorService: AggregatorService,
              private deviceService: DeviceService,
              private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.fetchAggregators();
  }

  private fetchAggregators() {
    if (this.deviceService.isPlatformServer()) { return; }

    this.aggregatorService.fetchAggregatedProductsTables(this.productId).subscribe(
      response => {
        this.tables = response.data;
      }
    );
  }

  getProductThumbnail(product: AggregatedProductDto) {
    if (!product.mediaUrl) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + product.mediaUrl;
    }
  }

  addToCart(product: AggregatedProductDto) {
    this.customerService.addToCart(product.sku, 1);
  }
}
