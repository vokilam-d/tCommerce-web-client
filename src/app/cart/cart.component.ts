import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../shared/services/customer/customer.service';
import { QuantityControlComponent } from '../shared/quantity-control/quantity-control.component';
import { OrderItemDto } from '../shared/dtos/order-item.dto';
import { finalize } from 'rxjs/operators';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../shared/constants';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  uploadedHost = API_HOST;
  isLoading: boolean = false;
  cartError: string | null = null;
  private cartErrorTimeout: number | undefined;

  @Input() isCrossSellVisible: boolean = false;
  @ViewChild(QuantityControlComponent) qtyCmp: QuantityControlComponent;

  get items() { return this.customerService.cart; }
  get cartTotalCost() { return this.customerService.cartTotalCost; }

  constructor(private customerService: CustomerService) {
  }

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
  }

  checkout() {
    this.resetCartError();
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
}
