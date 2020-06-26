import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { LinkedProductDto } from '../shared/dtos/linked-product.dto';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { ProductService } from '../pages/product/product.service';
import { SortingPaginatingFilterDto } from '../shared/dtos/spf.dto';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe.directive';
import { fromEvent } from 'rxjs';
import { DeviceService } from '../shared/services/device-detector/device.service';

@Component({
  selector: 'related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent extends NgUnsubscribe implements OnInit {

  items: ProductListItemDto[] = [];
  isLoading: boolean = false;
  private itemWidth: number;
  private activeItemIdx: number = 0;
  private itemsToShow: number = this.device.isMobile() ? 2 : 4;

  @Input() linkedProducts: LinkedProductDto[];
  @ViewChild('itemsContainerRef') itemsContainerRef: ElementRef;
  @ViewChildren('itemRef') itemRef: QueryList<ElementRef>;

  constructor(private productService: ProductService,
              private cdr: ChangeDetectorRef,
              private device: DeviceService,
              @Inject(PLATFORM_ID) private platformId: any) {
    super();
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  private fetchItems() {
    if (!this.linkedProducts?.length || !isPlatformBrowser(this.platformId)) { return; }

    const spf = new SortingPaginatingFilterDto();
    spf.id = this.linkedProducts.map(p => p.productId).join('|');

    this.isLoading = true;
    this.productService.fetchProductsByFilters(spf)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.setItems(response.data);
          this.handleResize();
        }
      );
  }

  isArrowVisible() {
    if (this.items.length > 2) {
      return true;
    } else {
      return false;
    }
  }

  prev() {
    if (this.activeItemIdx === 0) {
      this.activeItemIdx = this.items.length - this.itemsToShow;
    } else if (this.activeItemIdx < this.itemsToShow) {
      this.activeItemIdx = 0;
    } else {
      this.activeItemIdx -= this.itemsToShow;
    }

    this.setOffset();
  }

  next() {
    const nextIdx = this.activeItemIdx + this.itemsToShow;

    if (nextIdx > this.items.length - 1) {
      this.activeItemIdx = 0;
    } else if (nextIdx > this.items.length - this.itemsToShow) {
      this.activeItemIdx = this.items.length - this.itemsToShow;
    } else {
      this.activeItemIdx = nextIdx;
    }

    this.setOffset();
  }

  private setItems(items: ProductListItemDto[]) {
    const idsArr = this.linkedProducts.map(p => p.productId);

    this.items = items.sort((a, b) => {
      const indexOfA = idsArr.indexOf(a.productId);
      const indexOfB = idsArr.indexOf(b.productId);

      if (indexOfA > indexOfB) {
        return 1;
      } else if (indexOfA < indexOfB) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  private handleResize() {
    this.cdr.detectChanges();
    this.setSizes();

    fromEvent(window, 'resize')
      .pipe( debounceTime(500), takeUntil(this.ngUnsubscribe) )
      .subscribe(() => this.setSizes());
  }

  private setSizes() {
    const containerWidth = this.itemsContainerRef.nativeElement.parentElement.clientWidth;
    this.itemWidth = containerWidth / 2;
    this.itemRef.forEach(itemRef => itemRef.nativeElement.style.width = `${this.itemWidth}px`);
  }

  private setOffset() {
    const x = this.activeItemIdx * this.itemWidth;
    this.itemsContainerRef.nativeElement.style.transform = `translate3d(-${x}px, 0, 0)`;
    this.cdr.detectChanges();
  }
}
