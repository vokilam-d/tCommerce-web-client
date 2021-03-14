import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { QuantityControlComponent } from '../shared/quantity-control/quantity-control.component';
import { OrderItemDto } from '../shared/dtos/order-item.dto';
import { finalize } from 'rxjs/operators';
import { DEFAULT_ERROR_TEXT, MINIMAL_ORDER_COST, UPLOADED_HOST } from '../shared/constants';
import { AnalyticsService } from '../services/analytics/analytics.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;
  isLoading: boolean = false;
  cartError: string | null = null;
  minimalOrderCost = MINIMAL_ORDER_COST;
  private cartErrorTimeout: number | undefined;

  get items() { return this.customerService.cart; }
  get prices() { return this.customerService.prices; }
  get canPlaceOrder() { return this.prices.totalCost >= this.minimalOrderCost; }

  @Input() isCrossSellVisible: boolean = false;
  @Output('continueShopping') continueShoppingEvt = new EventEmitter();
  @ViewChild(QuantityControlComponent) qtyCmp: QuantityControlComponent;

  constructor(
    private customerService: CustomerService,
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit(): void {
  }

  onQtyChange(item: OrderItemDto, qty: number) {
    this.resetCartError();
    this.isLoading = true;
    this.customerService.updateQtyInCart(item, qty)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        _ => { },
        error => {
          this.qtyCmp.setValue(item.qty, false);
          this.setCartError(error);
        }
      );
  }

  deleteFromCart(item: OrderItemDto) {
    this.customerService.deleteFromCart(item);
    this.resetCartError();
    this.analyticsService.removeFromCart(item.sku, item.name, item.price, item.qty);
  }

  checkout() {
    this.resetCartError();
  }

  continueShopping() {
    this.continueShoppingEvt.emit();
  }

  private setCartError(error) {
    clearTimeout(this.cartErrorTimeout);

    this.cartError = error.error?.message || DEFAULT_ERROR_TEXT;
    this.cartErrorTimeout = setTimeout(() => this.resetCartError(), 10000) as any;
  }

  private resetCartError() {
    this.cartError = null;
    clearTimeout(this.cartErrorTimeout);
  }

  setItemImg(item) {
    if (!item.imageUrl) {
      return '/assets/images/no-img.jpg';
    } else {
      return this.uploadedHost + item.imageUrl;
    }
  }

}
