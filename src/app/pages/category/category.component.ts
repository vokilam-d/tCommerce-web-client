import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CategoryDto } from '../../shared/dtos/category.dto';
import { ProductService } from '../product/product.service';
import { ISelectedFilter } from '../../product-list/filter/selected-filter.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeadService } from '../../services/head/head.service';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../../shared/constants';
import { LinkedCategoryDto } from '../../shared/dtos/linked-category.dto';
import { ESort } from '../../shared/enums/sort.enum';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: CategoryDto;
  siblingCategories: LinkedCategoryDto[] = [];
  childCategories: LinkedCategoryDto[] = [];
  safeDescription: SafeHtml;
  breadcrumbs: IBreadcrumb[] = [];
  productListFilters: ISelectedFilter[];
  error: string;
  uploadedHost = UPLOADED_HOST;
  nameForAnalytics: string;
  defaultSortOption: ESort;

  get heading(): string {
    return this.category?.breadcrumbs.map(breadcrumb => breadcrumb.name).join(' ');
  }

  constructor(private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private headService: HeadService,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.fetchCategory();
  }

  private fetchCategory() {
    const slug = this.route.snapshot.data.slug;
    this.categoryService.fetchCategory(slug).subscribe(
      response => {
        this.category = response.data;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.category.description);
        this.siblingCategories = response.data.siblingCategories;
        this.childCategories = response.data.childCategories;
        this.setListFilters();
        this.setBreadcrumbs();
        this.setMeta();
        this.setNameForAnalytics();
        this.setDefaultSortOption();
      },
      error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
    );
  }

  private setListFilters() {
    this.productListFilters = [{ id: 'categoryId', valueId: this.category.id }];
  }

  private setBreadcrumbs() {
    this.breadcrumbs = this.category.breadcrumbs.map(breadcrumb => ({
      title: breadcrumb.name,
      link: breadcrumb.slug
    }));

    this.breadcrumbs.push({ title: this.category.name, link: this.category.slug });
  }

  private setMeta() {
    this.headService.setMeta(this.category.metaTags);
  }

  getCategoryImage(category) {
    if (!category.medias[0]?.variantsUrls.small) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + category.medias[0]?.variantsUrls.small;
    }
  }

  private setNameForAnalytics() {
    this.nameForAnalytics = `Category - ${this.category.name}`;
  }

  private setDefaultSortOption() {
    this.defaultSortOption = this.category.defaultItemsSort;
  }
}
