import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './services/product.service';
import { ProductDto } from '../../shared/dtos/product.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeadService, IOgTags } from '../../services/head/head.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerService } from '../../services/customer/customer.service';
import { finalize } from 'rxjs/operators';
import { FlyToCartDirective } from '../../shared/directives/fly-to-cart.directive';
import { QuantityControlComponent } from '../../shared/quantity-control/quantity-control.component';
import { DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { DeviceService } from '../../services/device-detector/device.service';
import { LinkedCategoryDto } from '../../shared/dtos/linked-category.dto';
import { StoreReviewService } from '../../services/store-review/store-review.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AdditionalServicesComponent } from './additional-services/additional-services.component';
import { onWindowLoad } from '../../shared/helpers/on-window-load.function';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  fetchError: string | null = null;
  addToCartError: string | null = null;
  addQuickReviewError: string | null = null;
  addQuickReviewSuccess: boolean = false;
  product: ProductDto;
  breadcrumbs: IBreadcrumb[] = [];
  categories: LinkedCategoryDto[] = [];
  isLoading: boolean = false;
  discountValue: number;
  needToShowReviewForm: boolean = null;
  needToShowReviews: boolean = false;
  isClosed: boolean;
  quickReview: number;
  get averageReviewsRating(): number { return this.storeReviewService.averageRating; }
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @ViewChild(ProductDetailsComponent) detailsCmp: ProductDetailsComponent;
  @ViewChild(FlyToCartDirective) flyToCart: FlyToCartDirective;
  @ViewChild(QuantityControlComponent) qtyCmp: QuantityControlComponent;
  @ViewChild(AdditionalServicesComponent) additionalServicesCmp: AdditionalServicesComponent;

  constructor(private route: ActivatedRoute,
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
    this.needToShowReviewForm = JSON.parse(this.route.snapshot.queryParamMap.get('leave-review'));
    this.needToShowReviews = this.route.snapshot.fragment === 'reviews';
    this.fetchProduct();
    this.setSavedTooltipState();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleReviewFromEmail();
      this.handleUrlReviewsFragment();
    }, 100);
  }

  private fetchProduct() {
    const slug = this.route.snapshot.data.slug;

    this.fetchError = null;
    this.productService.fetchProduct(slug).subscribe(
      response => {
        this.product = response.data;
        this.product.safeFullDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.fullDescription);
        this.categories = response.categories;
        this.setDiscountValue();
        this.setBreadcrumbs();
        this.setMeta();
        this.handleReviewFromEmail();
        this.handleUrlReviewsFragment();
        this.handleRecentlyViewedProducts();
        this.handleProductView();
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

  setQuickReview(rating: number) {
    this.isClosed = true;
    this.quickReview = rating;
  }

  addQuickReview(rating: number) {
    this.addQuickReviewError = null;

    this.productService.addQuickReview(this.product, rating).subscribe(
      response => {
        this.product.allReviewsCount = response.data.allReviewsCount;
        this.product.reviewsAvgRating = response.data.reviewsAvgRating;
        this.addQuickReviewSuccess = true;
      },
      error => this.addQuickReviewError = error.error?.message || DEFAULT_ERROR_TEXT
    );

    this.quickReview = null;
  }

  closeTooltip() {
    this.isClosed = true;
    localStorage.setItem('isTooltipClosed', JSON.stringify(this.isClosed));
  }

  setSavedTooltipState() {
    if (this.deviceService.isPlatformServer()) {
      return;
    }

    this.isClosed = !!localStorage.getItem('isTooltipClosed');
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
    this.flyToCart.start();

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

    this.analyticsService.addToCart(this.product.name, this.product.price, `Product page`);
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }

  private setDiscountValue() {
    this.discountValue = Math.ceil((this.product.oldPrice - this.product.price) / this.product.oldPrice * 100);
  }

  private handleReviewFromEmail() {
    if (!this.needToShowReviewForm || !this.detailsCmp) { return; }
    this.needToShowReviewForm = null;

    this.detailsCmp.scrollToReviewsAndSetFocus();
  }

  private handleUrlReviewsFragment() {
    if (!this.needToShowReviews || !this.detailsCmp) { return; }
    this.needToShowReviews = false;

    this.detailsCmp.scrollToReviews();
  }

  getRelatedProductsIds(): number[] {
    return this.product.relatedProducts.map(p => p.productId);
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

