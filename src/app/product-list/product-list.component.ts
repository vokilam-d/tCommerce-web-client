import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { ISelectedFilter } from './filter/selected-filter.interface';
import { ProductService } from '../pages/product/product.service';
import { SortingPaginatingFilterDto } from '../shared/dtos/spf.dto';
import { FilterComponent } from './filter/filter.component';
import { SortingComponent } from './sorting/sorting.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ScrollToService } from '../services/scroll-to/scroll-to.service';
import { FilterDto } from '../shared/dtos/filter.dto';
import { DEFAULT_ERROR_TEXT } from '../shared/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnChanges, AfterViewInit {

  items: ProductListItemDto[];
  itemsTotal: number;
  filteredCount: number;
  pagesTotal: number;
  page: number;
  filters: FilterDto[];
  error: string;
  private fetchSub: Subscription;
  get isLoading() { return this.fetchSub?.closed === false; }

  @Input() initialFilters: ISelectedFilter[] = [];

  @ViewChild('itemsRef') itemsRef: ElementRef;
  @ViewChild(FilterComponent) filterCmp: FilterComponent;
  @ViewChild(SortingComponent) sortingCmp: SortingComponent;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productService: ProductService,
              private scrollToService: ScrollToService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialFilters?.firstChange === false) {
      this.fetchProducts();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.fetchProducts());
  }

  fetchProducts(withLoadMoreBtn?: boolean) {
    const filterValue = this.filterCmp.getValue();
    const sortingValue = this.sortingCmp.getValue();
    const paginationValue = this.paginationCmp.getValue();

    const spf = new SortingPaginatingFilterDto();

    [...filterValue, ...this.initialFilters].forEach(filter => {
      if (spf[filter.id]) {
        if (Array.isArray(spf[filter.id])) {
          spf[filter.id].push(filter.valueId);
        } else {
          spf[filter.id] = [ spf[filter.id], filter.valueId ];
        }
      } else {
        spf[filter.id] = filter.valueId;
      }
    });

    spf.sort = sortingValue;
    spf.page = paginationValue;

    if (this.isLoading) { this.fetchSub.unsubscribe(); }
    this.fetchSub = this.productService.fetchProductsByFilters(spf)
      .subscribe(
        response => {
          if (withLoadMoreBtn) {
            this.items.push(...response.data);
          } else {
            this.items = response.data;
          }

          this.itemsTotal = response.itemsTotal;
          this.filteredCount = response.itemsFiltered;
          this.pagesTotal = response.pagesTotal;
          this.page = response.page;
          this.filters = response.filters;
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  openFilters() {
    this.filterCmp.openFilters();
  }

  onPagination() {
    this.scrollToService.scrollTo({ target: this.itemsRef, offset: -100, duration: 700 });
    this.fetchProducts(false);
  }

  onPaginationWithLoadMoreBtn() {
    this.fetchProducts(true);
  }

}
