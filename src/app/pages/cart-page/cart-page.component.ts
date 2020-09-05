import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CustomerService } from '../../services/customer/customer.service';
import { HeadService } from '../../services/head/head.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [{ title: 'Корзина' }];
  get isCartEmpty(): boolean { return !this.customerService.cart || !this.customerService.cart.length; }

  constructor(private customerService: CustomerService,
              private router: Router,
              private headService: HeadService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Корзина', description: 'Корзина' });
  }

  onContinueShopping() {
    this.router.navigate(['/']);
  }
}
