import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductDto } from '../../../shared/dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import { ScrollToService } from '../../../services/scroll-to/scroll-to.service';
import { ProductReviewService } from '../services/product-review.service';
import { ProductReviewDto } from '../../../shared/dtos/product-review.dto';
import { JsonLdService } from '../../../services/json-ld/json-ld.service';
import { SafeHtml } from '@angular/platform-browser';
import { DeviceService } from '../../../services/device-detector/device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AggregatorService } from '../aggregated-products/aggregator.service';
import { AggregatedProductsTableDto } from '../../../shared/dtos/aggregated-products-table.dto';
import { ToolbarService } from '../../../services/toolbar/toolbar.service';

type DetailsBlockId = 'aggregators' | 'description' | 'characteristics' | 'reviews' | 'related' | 'recent';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {

  jsonLd: SafeHtml;
  reviews: ProductReviewDto[] = [];
  currentDetailsBlockId: string = null;
  aggregatorTables: AggregatedProductsTableDto[];

  detailsBlocks = BLOCKS;

  isManualScrollInProgress: boolean = false;
  tabsPosition: number;
  isTabsFixed: boolean;

  @Input() product: ProductDto;
  @ViewChild('tabsRef') tabsRef: ElementRef<HTMLElement>;

  constructor(
    private http: HttpClient,
    private deviceService: DeviceService,
    private aggregatorService: AggregatorService,
    private router: Router,
    private route: ActivatedRoute,
    private toolbarService: ToolbarService,
    private renderer: Renderer2,
    private scrollToService: ScrollToService,
    private jsonLdService: JsonLdService,
    private productReviewService: ProductReviewService,
  ) { }

  ngOnInit(): void {
    this.fetchAggregators();

    if (this.product.textReviewsCount > 0) {
      this.fetchReviews();
    } else {
      this.setJsonLd();
    }
  }

  ngAfterViewInit() {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      this.selectDetailsBlock(fragment as DetailsBlockId);
    }
  }

  private fetchAggregators() {
    this.aggregatorService.fetchAggregatedProductsTables(this.product.productId).subscribe(
      response => {
        this.aggregatorTables = response.data;

        if (this.aggregatorTables.length === 0) {
          const aggregatorsDetailsBlockId = this.getDetailsBlockId('aggregators');
          this.detailsBlocks.find(detailsBlock => detailsBlock.id === aggregatorsDetailsBlockId).isVisible = false;
        }
      }
    );
  }

  private fetchReviews() {
    this.productReviewService.fetchProductReviews(this.product.productId)
      .subscribe(
        response => {
          this.reviews = response.data;
          this.setJsonLd();
        }
      );
  }

  getRelatedProductsIds(): number[] {
    return this.product.relatedProducts.map(p => p.productId);
  }

  getDetailsBlockId(detailsBlockId: DetailsBlockId): string {
    return detailsBlockId;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.handleTabsFixedState();
    this.handleTabsSelectionAndUrlFragment();
  }

  private handleTabsFixedState() {
    if (!this.deviceService.isMobile()) {
      return;
    }

    const toolbarHeight = this.toolbarService.toolbarElHeight;
    const tabsEl = this.tabsRef.nativeElement;

    this.isTabsFixed = window.pageYOffset > this.tabsPosition;

    if (!this.isTabsFixed) {
      this.tabsPosition = tabsEl.getBoundingClientRect().top + document.documentElement.scrollTop - toolbarHeight;
      this.renderer.setStyle(tabsEl, 'top', '0px');
      this.renderer.setStyle(tabsEl.parentElement, 'height', `auto`);
    } else {
      this.renderer.setStyle(tabsEl, 'top', `${toolbarHeight}px`);
      this.renderer.setStyle(tabsEl.parentElement, 'height', `${toolbarHeight}px`);
    }
  }

  private handleTabsSelectionAndUrlFragment() {
    if (this.isManualScrollInProgress || !this.deviceService.isMobile()) {
      return;
    }

    const scrollPosition = window.pageYOffset;

    let currentEl: HTMLElement;
    for (const detailsBlock of Object.values(this.detailsBlocks)) {
      const el = document.getElementById(detailsBlock.id);
      if (el && el.offsetTop < (scrollPosition + 100)) {
        currentEl = el;
      }
    }

    let needToUpdateUrlFragment: boolean = false;

    if (currentEl) {
      const fragment = this.getDetailsBlockId(currentEl.id as DetailsBlockId);
      if (this.currentDetailsBlockId !== fragment) {
        this.currentDetailsBlockId = fragment;
        needToUpdateUrlFragment = true;
        // currentEl.scrollIntoView(false);
      }
    } else {
      if (this.currentDetailsBlockId) {
        this.currentDetailsBlockId = null;
        needToUpdateUrlFragment = true;
      }
    }

    if (needToUpdateUrlFragment) {
      this.updateUrlFragment();
    }
  }

  private setJsonLd() {
    this.jsonLd = this.jsonLdService.getSafeJsonLdForProduct(this.product, this.reviews);
  }

  selectDetailsBlock(detailsBlockId: DetailsBlockId) {
    this.isManualScrollInProgress = true;
    this.scrollToService.scrollTo({ target: detailsBlockId, offset: -100 })
      .subscribe({ complete: () => this.isManualScrollInProgress = false });

    if (this.currentDetailsBlockId !== detailsBlockId) {
      this.currentDetailsBlockId = detailsBlockId;
      this.updateUrlFragment();
    }
  }

  isDetailsBlockActive(detailsBlockId: DetailsBlockId): boolean {
    const isFirstVisible = this.detailsBlocks.filter(detailsBlock => detailsBlock.isVisible)[0]?.id === detailsBlockId;
    if (isFirstVisible) {
      return this.currentDetailsBlockId === detailsBlockId || this.currentDetailsBlockId === null;
    }

    return this.currentDetailsBlockId === detailsBlockId;
  }

  isDetailsBlockVisible(detailsBlockId: DetailsBlockId): boolean {
    return this.detailsBlocks.find(detailsBlock => detailsBlock.id === detailsBlockId).isVisible;
  }

  private updateUrlFragment() {
    this.router.navigate(['.'], { relativeTo: this.route, fragment: this.currentDetailsBlockId, replaceUrl: true })
  }
}

const BLOCKS: { id: DetailsBlockId, label: string, isVisible: boolean }[] = [
  {
    id: 'aggregators',
    label: 'product_details.aggregators',
    isVisible: true
  },
  {
    id: 'description',
    label: 'product_details.description',
    isVisible: true
  },
  {
    id: 'characteristics',
    label: 'product_details.characteristics',
    isVisible: true
  },
  {
    id: 'reviews',
    label: 'global.reviews',
    isVisible: true
  },
  {
    id: 'related',
    label: 'product_details.related',
    isVisible: true
  },
  {
    id: 'recent',
    label: 'product_details.recent',
    isVisible: true
  }
];
