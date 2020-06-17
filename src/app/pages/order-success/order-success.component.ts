import { Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID } from '@angular/core';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OrderDto } from '../../shared/dtos/order.dto';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { HeadService } from '../../shared/services/head/head.service';
import { OrderService } from '../checkout/order.service';

declare const Wayforpay: any;

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  uploadedHost = API_HOST;
  order: OrderDto;
  breadcrumbs: IBreadcrumb[] = SUCCESS_BREADCRUMBS;
  paymentError: string = null;
  paymentSuccess: boolean = false;
  private wayforpay: any;

  constructor(@Inject(PLATFORM_ID) private platformId: any,
              @Inject(LOCALE_ID) private locale: string,
              private headService: HeadService,
              private orderService: OrderService,
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
    this.breadcrumbs = [...SUCCESS_BREADCRUMBS, { title: `Заказ №${this.order.id}` }];
    this.setMeta();

    if (this.order.isOnlinePayment) {
      this.initOnlinePayment();
    } else {
      this.showGoogleCustomerReview();
    }
  }

  private initOnlinePayment() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://secure.wayforpay.com/server/pay-widget.js';
    script.onerror = error => this.paymentError = (error as any) || DEFAULT_ERROR_TEXT;
    script.onload = () => {
      this.wayforpay = new Wayforpay;
      this.pay();
    }

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  pay() {
    this.orderService.getPaymentDetails(this.order.id)
      .subscribe(
        response => {
          const wfpPayload = response.data;
          wfpPayload.straightWidget =  true;

          this.wayforpay.run(
            wfpPayload,
            () => this.paymentSuccess = true,
            error => this.paymentError = error || DEFAULT_ERROR_TEXT
          );
        },
        error => this.paymentError = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }


  private setMeta() {
    this.headService.setMeta({ title: `Заказ №${this.order.id}`, description: `Заказ №${this.order.id}` });
  }

  private showGoogleCustomerReview() {
    const orderId = this.order.id;
    const email = this.order.email;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDate: string = formatDate(deliveryDate, 'yyyy-MM-dd', this.locale);
    console.log({ formattedDate });

    (window as any).renderOptIn = function() {
      (window as any).gapi.load('surveyoptin', function() {
        (window as any).gapi.surveyoptin.render(
          {
            "merchant_id": 139367975,
            "order_id": orderId,
            "email": email,
            "delivery_country": "UA",
            "estimated_delivery_date": formattedDate,
            "opt_in_style": "CENTER_DIALOG"
          });
      });
    }

    const gcrScript = document.createElement('script');
    gcrScript.setAttribute("src", "https://apis.google.com/js/platform.js?onload=renderOptIn");
    gcrScript.setAttribute("async", 'true');
    gcrScript.setAttribute("defer", 'true');
    document.getElementsByTagName("head")[0].appendChild(gcrScript);
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
