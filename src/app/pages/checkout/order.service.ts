import { Injectable } from '@angular/core';
import { ShippingMethodDto } from '../../shared/dtos/shipping-method.dto';
import { PaymentMethodDto } from '../../shared/dtos/payment-method.dto';
import { HttpClient } from '@angular/common/http';
import { AddOrderDto, OrderDto } from '../../shared/dtos/order.dto';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { ShippingAddressDto } from '../../shared/dtos/shipping-address.dto';
import { tap } from 'rxjs/operators';
import { ResponseDto } from '../../shared/dtos/response.dto';

@Injectable()
export class OrderService {

  email: string = '';
  address: ShippingAddressDto = new ShippingAddressDto();
  shippingMethod: ShippingMethodDto;
  paymentMethod: PaymentMethodDto;
  isCallbackNeeded: boolean = false;
  note: string = '';

  constructor(private http: HttpClient,
              private customerService: CustomerService) {
  }

  placeOrder(addOrderDto: AddOrderDto) {
    return this.http.post<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/order`, addOrderDto)
      .pipe( tap(_ => this.resetOrder()) );
  }

  private resetOrder() {
    this.email = '';
    this.address = new ShippingAddressDto();
    this.shippingMethod = null;
    this.paymentMethod = null;
    this.isCallbackNeeded = false;
    this.note = '';

    this.customerService.resetCart();
  }
}
