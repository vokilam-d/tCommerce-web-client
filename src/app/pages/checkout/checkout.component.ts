import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrderCustomerInfoComponent } from './order-customer-info/order-customer-info.component';
import { AddOrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from './order.service';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../../shared/constants';
import { normalizePhoneNumber } from '../../shared/helpers/normalize-phone-number.function';
import { ScrollToService } from '../../services/scroll-to/scroll-to.service';
import { HeadService } from '../../services/head/head.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends NgUnsubscribe implements OnInit {

  currentYear = new Date().getFullYear();
  uploadedHost = UPLOADED_HOST;
  isOrderLoading: boolean = false;
  orderError: string | null = null;
  minimalOrderCost = 150;

  get cart() { return this.customerService.cart; }
  get prices() { return this.customerService.prices; }
  get isLoggedIn() { return this.customerService.isLoggedIn; }
  get canPlaceOrder() { return this.prices.totalCost >= this.minimalOrderCost; }

  @ViewChild(OrderCustomerInfoComponent) infoCmp: OrderCustomerInfoComponent;
  @ViewChild('checkoutRef') checkoutRef: ElementRef;

  constructor(private customerService: CustomerService,
              private headService: HeadService,
              private analytics: AnalyticsService,
              private orderService: OrderService,
              private scrollToService: ScrollToService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.setMeta();
    this.customerService.cartInit$
      .pipe( takeUntil(this.ngUnsubscribe), filter(value => !!value) )
      .subscribe(() => {
        if (!this.cart.length) {
          this.router.navigateByUrl('/cart');
        }
      });
  }

  login() {
    this.customerService.showLoginModal();
  }

  placeOrder() {
    if (!this.infoCmp.checkInfoValidity()) {
      return;
    }
    if (!this.orderService.paymentMethod) {
      this.setError(`Не выбран способ оплаты`);
      return;
    }
    if (!this.canPlaceOrder) {
      return;
    }

    const dto = new AddOrderDto();
    dto.email = this.infoCmp.getEmail();
    dto.address = this.infoCmp.getAddress();
    dto.address.phone = normalizePhoneNumber(dto.address.phone);
    dto.paymentMethodId = this.orderService.paymentMethod.id;
    dto.isCallbackNeeded = this.orderService.isCallbackNeeded;
    dto.clientNote = this.orderService.clientNote;
    dto.items = this.customerService.cart;

    this.orderError = null;
    this.isOrderLoading = true;
    this.orderService.placeOrder(dto)
      .pipe( finalize(() => this.isOrderLoading = false) )
      .subscribe(
        response => {
          const order = response.data;
          this.analytics.orderSuccess(order.id, order.prices.totalCost);

          this.router.navigate(['/', 'order-success'], { state: { order } });
        },
        error => this.setError(error.error?.message || DEFAULT_ERROR_TEXT)
      );

    this.analytics.confirmOrder(this.prices.totalCost);
  }

  editCart() {
    this.customerService.showCartModal();
    this.analytics.editOrder();
  }

  private setError(error: string | string[]) {
    if (Array.isArray(error)) {
      error = error.join('\n');
    }

    this.orderError = error;
    this.scrollToService.scrollTo({ target: this.checkoutRef, offset: -60 });
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Klondike | Оформление заказа', description: 'Оформление заказа' });
  }

  setItemImg(item) {
    if (!item.imageUrl) {
      return '/assets/images/no-img.png';
    } else {
      return this.uploadedHost + item.imageUrl;
    }
  }

}
