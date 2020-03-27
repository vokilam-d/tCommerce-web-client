import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerService } from '../shared/services/customer/customer.service';
import { QuantityControlComponent } from '../shared/quantity-control/quantity-control.component';
import { OrderItemDto } from '../shared/dtos/order-item.dto';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  isLoading: boolean = false;

  @Output('checkout') checkoutEmitter = new EventEmitter();
  @ViewChild(QuantityControlComponent) qtyCmp: QuantityControlComponent;

  get items() { return this.customerService.cart; }
  get cartTotalCost() { return this.customerService.cartTotalCost; }

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
  }

  onQtyChange(item: OrderItemDto, qty: number) {
    this.isLoading = true;
    this.customerService.updateQtyInCart(item, qty)
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => { },
        error => {
          this.qtyCmp.setValue(1, false);
        }
      );
  }

  deleteFromCart(item: OrderItemDto) {
    this.customerService.deleteFromCart(item);
  }

  checkout() {
    this.checkoutEmitter.emit();
  }
}
