import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class WebClientProductComponent implements OnInit {

  product: any;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.fetchProduct();
  }

  private fetchProduct() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.productService.fetchProduct(slug).subscribe(
      product => {
        this.product = product;
        console.log(this.product);
      },
      error => console.warn(error)
    );
  }

  selectThumbnail(url: any) {
    console.log('select thumbnail!', url);
  }
}
