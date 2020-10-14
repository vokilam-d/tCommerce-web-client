import { Component, Input, OnInit } from '@angular/core';
import { AggregatorService } from './aggregator.service';
import { AggregatedProductsTableDto } from '../../../shared/dtos/aggregated-products-table.dto';
import { DeviceService } from '../../../services/device-detector/device.service';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../../../shared/constants';
import { AggregatedProductDto } from '../../../shared/dtos/aggregated-product.dto';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotyService } from '../../../noty/noty.service';
import { finalize } from 'rxjs/operators';
import { AnalyticsService } from '../../../services/analytics/analytics.service';

@Component({
  selector: 'aggregated-products',
  templateUrl: './aggregated-products.component.html',
  styleUrls: ['./aggregated-products.component.scss']
})
export class AggregatedProductsComponent implements OnInit {

  tables: AggregatedProductsTableDto[] = [];
  uploadedHost = UPLOADED_HOST;

  @Input() productId: number;

  constructor(private aggregatorService: AggregatorService,
              private deviceService: DeviceService,
              private notyService: NotyService,
              private customerService: CustomerService,
              private analyticsService: AnalyticsService
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
    product.isLoading = true;

    this.customerService.addToCart(product.sku, 1)
      .pipe( finalize(() => product.isLoading = false) )
      .subscribe(
        () => {},
        error => this.notyService.error(error.error?.message || DEFAULT_ERROR_TEXT)
      );

    this.analyticsService.addToCart(product.name, product.price, `Aggregated products`);
  }
}
