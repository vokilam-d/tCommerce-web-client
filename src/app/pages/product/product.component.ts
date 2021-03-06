import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { ProductDto } from '../../shared/dtos/product.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { HeadService, IOgTags } from '../../services/head/head.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from '../../services/customer/customer.service';
import { finalize } from 'rxjs/operators';
import { QuantityControlComponent } from '../../shared/quantity-control/quantity-control.component';
import { DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { DeviceService } from '../../services/device-detector/device.service';
import { LinkedCategoryDto } from '../../shared/dtos/linked-category.dto';
import { StoreReviewService } from '../../services/store-review/store-review.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { onWindowLoad } from '../../shared/helpers/on-window-load.function';
import { logDebug } from '../../shared/helpers/debug.function';
import { ProductLabelTypeEnum } from '../../shared/enums/product-label-type.enum';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  fetchError: string | null = null;
  addToCartError: string | null = null;
  product: ProductDto;
  breadcrumbs: IBreadcrumb[] = [];
  categories: LinkedCategoryDto[] = [];
  isLoading: boolean = false;
  discountValue: number;
  get averageReviewsRating(): number { return this.storeReviewService.averageRating; }
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @ViewChild(QuantityControlComponent) qtyCmp: QuantityControlComponent;
  @ViewChild(AdditionalServicesComponent) additionalServicesCmp: AdditionalServicesComponent;

  constructor(
    private route: ActivatedRoute,
    private headService: HeadService,
    private customerService: CustomerService,
    private sanitizer: DomSanitizer,
    private wishlistService: WishlistService,
    private productService: ProductService,
    private deviceService: DeviceService,
    private storeReviewService: StoreReviewService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    logDebug(`[ProductComponent] "${this.route.snapshot.data.slug}" ngOnInit`);
    this.fetchProduct();
  }

  private fetchProduct() {
    const slug = this.route.snapshot.data.slug;

    this.fetchError = null;
    this.productService.fetchProduct(slug).subscribe(
      response => {
        logDebug(`[ProductComponent] "${slug}" fetchProduct response subscribe start`);
        this.product = response.data;
        this.product.safeFullDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.fullDescription);
        this.categories = response.categories;
        this.setDiscountValue();
        this.setBreadcrumbs();
        this.setMeta();
        this.handleRecentlyViewedProducts();
        this.handleProductView();
        this.analyticsService.trackViewContent(this.product);
        logDebug(`[ProductComponent] "${slug}" fetchProduct response subscribe end`);
      },
      error => this.fetchError = error.error?.message || DEFAULT_ERROR_TEXT
    );
  }

  private setBreadcrumbs() {
    this.breadcrumbs = this.product.breadcrumbs.map(breadcrumb => ({
      title: breadcrumb.name,
      link: breadcrumb.slug
    }));

    this.breadcrumbs.push({ title: this.product.name, link: this.product.slug });
  }

  private setMeta() {
    const ogTags: IOgTags = {
      type: 'product',
      url: `https://klondike.com.ua/${this.product.slug}`,
      description: this.product.metaTags.description,
      title: this.product.metaTags.title
    };
    if (this.product.medias[0]) {
      ogTags.image = `https://klondike.com.ua${this.product.medias[0].variantsUrls.original}`;
    }

    this.headService.setMeta(this.product.metaTags, ogTags);
  }

  addToCart() {
    const qty = this.qtyCmp.getValue();
    const additionalServiceIds = this.additionalServicesCmp.getSelectedIds();

    this.addToCartError = null;
    this.isLoading = true;
    this.customerService.addToCart(this.product.sku, qty, additionalServiceIds)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => { },
        error => {
          this.addToCartError = error.error?.message || DEFAULT_ERROR_TEXT;
        }
      );

    this.analyticsService.addToCart(this.product.sku, this.product.name, this.product.price, `Product page`);
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  public getLabelClass() {
    switch (this.product.label.type) {
      case ProductLabelTypeEnum.New:
        return 'product__label--new';
      case ProductLabelTypeEnum.Top:
        return 'product__label--top';
    }
  }

  public onReviewsUpdated(event: { reviewsAvgRating: number; allReviewsCount: number }): void {
    this.product.allReviewsCount = event.allReviewsCount;
    this.product.reviewsAvgRating = event.reviewsAvgRating;
  }

  private setDiscountValue() {
    this.discountValue = Math.ceil((this.product.oldPrice - this.product.price) / this.product.oldPrice * 100);
  }

  private handleRecentlyViewedProducts() {
    if (this.deviceService.isPlatformBrowser()) {
      this.productService.addViewedProductIdToLocalStorage(this.product.productId);
    }
  }

  private handleProductView() {
    onWindowLoad(this, () => {
      this.productService.incrementViewsCount(this.product.id).subscribe();
    });
  }
}
