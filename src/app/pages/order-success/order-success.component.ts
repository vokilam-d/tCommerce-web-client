import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OrderDto } from '../../shared/dtos/order.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  order: OrderDto;
  breadcrumbs: IBreadcrumb[] = SUCCESS_BREADCRUMBS;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) { return; }

    this.order = window.history.state.order;
    if (!this.order) {
      this.router.navigateByUrl('/cart');
      return;
    }

    this.init();
  }

  private init() {
    this.breadcrumbs.push({ title: `Заказ №${this.order.id}` });
    console.log({order: this.order});
  }
}

const SUCCESS_BREADCRUMBS: IBreadcrumb[] = [
  {
    title: 'Мой кабинет',
    link: 'account'
  },
  {
    title: 'Мои заказы',
    link: 'account/orders'
  }
];
