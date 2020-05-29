import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OrderDto } from '../../shared/dtos/order.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { API_HOST } from '../../shared/constants';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { HeadService } from '../../shared/services/head/head.service';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  uploadedHost = API_HOST;
  order: OrderDto;
  breadcrumbs: IBreadcrumb[] = SUCCESS_BREADCRUMBS;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              private headService: HeadService,
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
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Заказ №${this.order.id}', description: 'Заказ №${this.order.id}' });
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
