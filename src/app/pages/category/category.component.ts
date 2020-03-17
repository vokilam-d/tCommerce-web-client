import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CategoryDto } from '../../shared/dtos/category.dto';
import { ProductService } from '../product/product.service';
import { IProductListFilter } from '../../product-list/product-list-filter.interface';
import { ProductDto } from '../../shared/dtos/product.dto';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: CategoryDto;
  breadcrumbs: IBreadcrumb[];
  productListFilters: IProductListFilter[];

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.fetchCategory();
  }

  private fetchCategory() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.categoryService.fetchCategory(slug).subscribe(
      response => {
        this.category = response.data;
        this.setListFilters();
        this.setBreadcrumbs();
        this.setMeta();
      },
      error => console.warn(error)
    );
  }

  private setListFilters() {
    this.productListFilters = [{ fieldName: 'categoryIds', value: this.category.id }];
  }

  private setBreadcrumbs() {
    this.breadcrumbs = this.category.breadcrumbs.map(breadcrumb => ({
      title: breadcrumb.name,
      link: breadcrumb.slug
    }));

    this.breadcrumbs.push({ title: this.category.name, link: this.category.slug });
  }

  private setMeta() {
  }
}
