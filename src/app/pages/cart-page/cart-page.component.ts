import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CustomerService } from '../../shared/services/customer/customer.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: 'Корзина' }];
  get isCartEmpty(): boolean { return !this.customerService.cart || !this.customerService.cart.length; }

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

}