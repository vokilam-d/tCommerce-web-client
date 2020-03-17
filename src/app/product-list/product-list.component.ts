import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProductListItemDto } from '../shared/dtos/product-list-item.dto';
import { IProductListFilter } from './product-list-filter.interface';
import { ProductService } from '../pages/product/product.service';
import { SortingPaginatingFilterDto } from '../shared/dtos/spf.dto';
import { FilterComponent } from './filter/filter.component';
import { SortingComponent } from './sorting/sorting.component';
import { PaginationComponent } from './pagination/pagination.component';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  items: ProductListItemDto[];
  @Input() initialFilters: IProductListFilter[] = [];

  @ViewChild(FilterComponent) filterCmp: FilterComponent;
  @ViewChild(SortingComponent) sortingCmp: SortingComponent;
  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.fetchProducts();
  }

  private fetchProducts() {
    const filterValue = this.filterCmp.getValue();
    const sortingValue = this.sortingCmp.getValue();
    const paginationValue = this.paginationCmp.getValue();

    const spf = new SortingPaginatingFilterDto();
    spf.sort = sortingValue;
    spf.limit = paginationValue.limit;
    spf.page = paginationValue.page;

    [...filterValue, ...this.initialFilters].forEach(filter => {
      spf[filter.fieldName] = filter.value;
    });

    this.productService.fetchProductsByFilters(spf)
      .subscribe(
        response => {
          this.items = response.data;
        },
        error => {
          console.warn(error);
        }
      )
  }

  openFilters() {
    this.filterCmp.openFilters();
  }
}
