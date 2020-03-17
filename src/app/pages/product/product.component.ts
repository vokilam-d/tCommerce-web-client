import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { ProductDto } from '../../shared/dtos/product.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormControl } from '@angular/forms';
import { HeadService, IOgTags } from '../../shared/services/head/head.service';
import { CartService } from '../../shared/services/cart/cart.service';
import { WishlistService } from '../../shared/services/wishlist/wishlist.service';

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
              private headService: HeadService,
              private wishlistService: WishlistService,
              private cartService: CartService,
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
        this.setBreadcrumbs();
        this.setMeta();
      },
      error => console.warn(error)
    );
  }

  private setBreadcrumbs() {
    this.breadcrumbs = this.product.breadcrumbs.map(breadcrumb => ({
      title: breadcrumb.name,
      link: breadcrumb.slug
    }));

    this.breadcrumbs.push({ title: this.product.name, link: this.product.slug });
  }

  scrollToReviews() {
    this.detailsCmp.openReviewsTab();
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

  private setMeta() {
    const ogTags: IOgTags = {
      type: 'product',
      url: `https://klondike.com.ua/${this.product.slug}`,
      description: this.product.metaTags.description,
      title: this.product.metaTags.title
    };
    if (this.product.medias[0]) {
      ogTags.image = `https://klondike.com.ua${this.product.medias[0].variantsUrls.original}`;
    }

    this.headService.setMeta(this.product.metaTags, ogTags);
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.qtyControl.value);
  }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
  }
}
