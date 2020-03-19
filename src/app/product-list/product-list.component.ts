import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { IProductListFilter } from './product-list-filter.interface';
import { ProductService } from '../pages/product/product.service';
import { SortingPaginatingFilterDto } from '../shared/dtos/spf.dto';
import { FilterComponent } from './filter/filter.component';
import { SortingComponent } from './sorting/sorting.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ScrollToService } from '../shared/services/scroll-to/scroll-to.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  items: ProductListItemDto[];
  itemsTotal: number;
  pagesTotal: number;
  page: number;

  @Input() initialFilters: IProductListFilter[] = [];

  @ViewChild('itemsRef') itemsRef: ElementRef;
  @ViewChild(FilterComponent) filterCmp: FilterComponent;
  @ViewChild(SortingComponent) sortingCmp: SortingComponent;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productService: ProductService,
              private scrollToService: ScrollToService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const filterValue = this.filterCmp.getValue();
    const sortingValue = this.sortingCmp.getValue();
    const paginationValue = this.paginationCmp.getValue();

    const spf = new SortingPaginatingFilterDto();
    spf.sort = sortingValue;
    spf.page = paginationValue;

    [...filterValue, ...this.initialFilters].forEach(filter => {
      spf[filter.fieldName] = filter.value;
    });

    this.productService.fetchProductsByFilters(spf)
      .subscribe(
        response => {
          this.items = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
          this.page = response.page;
        },
        error => {
          console.warn(error);
        }
      );
  }

  openFilters() {
    this.filterCmp.openFilters();
  }

  onPaginationChanged() {
    this.scrollToService.scrollTo({ target: this.itemsRef, offset: -100, duration: 700 });
    this.fetchProducts();
  }
}
