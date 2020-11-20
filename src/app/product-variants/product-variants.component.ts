import { Component, Input, OnInit } from '@angular/core';
import { ProductVariantGroupDto } from '../shared/dtos/product-variant.dto';

@Component({
  selector: 'product-variants',
  templateUrl: './product-variants.component.html',
  styleUrls: ['./product-variants.component.scss']
})
export class ProductVariantsComponent implements OnInit {

  @Input() variantGroups: ProductVariantGroupDto[] = [];
  @Input() isBigSize: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
