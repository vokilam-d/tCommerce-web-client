import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe.directive';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OrderCustomerInfoComponent } from './order-customer-info/order-customer-info.component';
import { AddOrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from './order.service';
import { DEFAULT_ERROR_TEXT } from '../../shared/constants';
import { normalizePhoneNumber } from '../../shared/helpers/normalize-phone-number.function';
import { ScrollToService } from '../../shared/services/scroll-to/scroll-to.service';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends NgUnsubscribe implements OnInit {

  isOrderLoading: boolean = false;
  orderError: string | null = null;

  get cart() { return this.customerService.cart; }
  get cartTotalCost() { return this.customerService.cartTotalCost; }
  get isLoggedIn() { return this.customerService.isLoggedIn; }

  @ViewChild(OrderCustomerInfoComponent) infoCmp: OrderCustomerInfoComponent;
  @ViewChild('checkoutRef') checkoutRef: ElementRef;

  constructor(private customerService: CustomerService,
              private orderService: OrderService,
              private scrollToService: ScrollToService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
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
    if (!this.infoCmp.checkInfoValidity()) { return; }

    const dto = new AddOrderDto();
    dto.email = this.orderService.email;
    dto.address = this.orderService.address;
    dto.address.phoneNumber = normalizePhoneNumber(dto.address.phoneNumber);
    dto.shippingMethodId = this.orderService.shippingMethod.id;
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
          this.router.navigate(['/', 'order-success'], { state: { order: response.data } });
        },
        error => this.setError(error)
      );
  }

  editCart() {
    this.customerService.showCartModal();
  }

  private setError(error) {
    this.orderError = error.error ? error.error.message : DEFAULT_ERROR_TEXT;
    this.scrollToService.scrollTo({ target: this.checkoutRef, offset: -60 });
  }
}
