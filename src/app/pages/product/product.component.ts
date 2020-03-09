import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { ProductDto } from '../../shared/dtos/product.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { ScrollToService } from '../../shared/services/scroll-to/scroll-to.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductDto;
  breadcrumbs: IBreadcrumb[] = [];
  qtyControl: FormControl = new FormControl(1);

  @ViewChild(ProductDetailsComponent) detailsCmp: ProductDetailsComponent;

  constructor(private route: ActivatedRoute,
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
    this.detailsCmp.openReviews();
  }

  incrementQty() {
    let qty = this.qtyControl.value;
    this.qtyControl.setValue(++qty);
  }

  decrementQty() {
    let qty = this.qtyControl.value;
    if (qty <= 1) { return; }

    this.qtyControl.setValue(--qty);
  }
}
