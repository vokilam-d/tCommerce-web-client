import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RecipientAddressComponent } from './recipient-address/recipient-address.component';
import { OrderService } from './order.service';
import { DEFAULT_ERROR_TEXT, MINIMAL_ORDER_COST, UPLOADED_HOST } from '../../shared/constants';
import { ScrollToService } from '../../services/scroll-to/scroll-to.service';
import { HeadService } from '../../services/head/head.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { vibrate } from '../../shared/helpers/vibrate.function';
import { LanguageService } from '../../services/language/language.service';
import { AddOrderDto } from '../../shared/dtos/add-order.dto';
import { CustomerContactInfoComponent } from '../../customer-contact-info/customer-contact-info.component';
import { RecipientContactInfoComponent } from '../../recipient-contact-info/recipient-contact-info.component';

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
  minimalOrderCost = MINIMAL_ORDER_COST;

  get cart() { return this.customerService.cart; }
  get prices() { return this.customerService.prices; }
  get isLoggedIn() { return this.customerService.isLoggedIn; }
  get canPlaceOrder() { return this.prices.totalCost >= this.minimalOrderCost; }

  @ViewChild(RecipientAddressComponent) recipientAddressCmp: RecipientAddressComponent;
  @ViewChild(CustomerContactInfoComponent) customerContactInfoCmp: CustomerContactInfoComponent;
  @ViewChild(RecipientContactInfoComponent) recipientContactInfoCmp: RecipientContactInfoComponent;
  @ViewChild('checkoutRef') checkoutRef: ElementRef;

  constructor(
    private customerService: CustomerService,
    private headService: HeadService,
    private analytics: AnalyticsService,
    private orderService: OrderService,
    private scrollToService: ScrollToService,
    private router: Router,
    private languageService: LanguageService
  ) {
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
    if (!this.customerContactInfoCmp.checkValidity()) {
      return;
    }
    if (!this.recipientContactInfoCmp.checkValidity()) {
      return;
    }
    if (!this.recipientAddressCmp.checkAddressValidity()) {
      return;
    }
    if (!this.orderService.paymentMethod) {
      this.languageService.getTranslation('checkout.payment_not_selected').subscribe(text => {
        this.setError(text);
      });
      return;
    }
    if (!this.canPlaceOrder) {
      return;
    }

    const dto = new AddOrderDto();
    dto.customerContactInfo = this.customerContactInfoCmp.getValue();
    dto.recipientContactInfo = this.recipientContactInfoCmp.getValue();
    dto.address = this.recipientAddressCmp.getAddress();
    dto.paymentMethodId = this.orderService.paymentMethod.id;
    dto.isCallbackNeeded = this.orderService.isCallbackNeeded;
    dto.note = this.orderService.note;
    dto.items = this.customerService.cart;

    this.orderError = null;
    this.isOrderLoading = true;
    this.orderService.placeOrder(dto)
      .pipe( finalize(() => this.isOrderLoading = false) )
      .subscribe(
        response => {
          const order = response.data;
          this.analytics.trackOrderPlaced(order);

          vibrate();
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
    this.languageService.getTranslation('checkout.checkout').subscribe(text => {
      this.headService.setMeta({ title: `Klondike | ${text}`, description: text });
    });
  }

  setItemImg(item) {
    if (!item.imageUrl) {
      return '/assets/images/no-img.jpg';
    } else {
      return this.uploadedHost + item.imageUrl;
    }
  }
}
