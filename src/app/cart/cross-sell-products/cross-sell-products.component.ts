import { Component, Input, OnInit } from '@angular/core';
import { ProductListItemDto } from '../../shared/dtos/product-list-item.dto';

@Component({
  selector: 'cross-sell-products',
  templateUrl: './cross-sell-products.component.html',
  styleUrls: ['./cross-sell-products.component.scss']
})
export class CrossSellProductsComponent implements OnInit {

  @Input() products:  ProductListItemDto[];

  constructor() { }

  ngOnInit() { }

}
