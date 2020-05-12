import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CategoryDto } from '../../shared/dtos/category.dto';
import { ProductService } from '../product/product.service';
import { IProductListFilter } from '../../product-list/product-list-filter.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HeadService } from '../../shared/services/head/head.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: CategoryDto;
  safeDescription: SafeHtml;
  breadcrumbs: IBreadcrumb[];
  productListFilters: IProductListFilter[];

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
    const slug = this.route.snapshot.paramMap.get('slug');
    this.categoryService.fetchCategory(slug).subscribe(
      response => {
        this.category = response.data;
        this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.category.description);
        this.setListFilters();
        this.setBreadcrumbs();
        this.setMeta();
      },
      error => console.warn(error)
    );
  }

  private setListFilters() {
    this.productListFilters = [{ fieldName: 'categoryId', value: this.category.id }];
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
}
