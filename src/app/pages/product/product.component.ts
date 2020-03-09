import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { ProductDto } from '../../shared/dtos/product.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { ScrollToService } from '../../shared/services/scroll-to/scroll-to.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDto;
  breadcrumbs: IBreadcrumb[] = [];

  @ViewChild('reviews') reviewsRef: ElementRef;

  constructor(private route: ActivatedRoute,
              private scrollToService: ScrollToService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.fetchProduct();
  }

  private fetchProduct() {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.productService.fetchProduct(slug).subscribe(
      response => {
        this.product = response.data;
        this.buildBreadcrumbs();
      },
      error => console.warn(error)
    );
  }

  private buildBreadcrumbs() {
    this.breadcrumbs = this.product.breadcrumbs.map(breadcrumb => ({
      title: breadcrumb.name,
      link: breadcrumb.slug
    }));

    this.breadcrumbs.push({ title: this.product.name });
  }

  scrollToReviews() {
    this.scrollToService.scrollTo({ target: this.reviewsRef });
  }
}
