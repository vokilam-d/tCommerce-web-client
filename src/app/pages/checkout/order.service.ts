import { Injectable } from '@angular/core';
import { PaymentMethodDto } from '../../shared/dtos/payment-method.dto';
import { HttpClient } from '@angular/common/http';
import { AddOrderDto, OrderDto } from '../../shared/dtos/order.dto';
import { CustomerService } from '../../services/customer/customer.service';
import { tap } from 'rxjs/operators';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { API_HOST } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  paymentMethod: PaymentMethodDto;
  isCallbackNeeded: boolean = false;
  clientNote: string = '';

  constructor(private http: HttpClient,
              private customerService: CustomerService) {
  }

  placeOrder(addOrderDto: AddOrderDto) {
    return this.http.post<ResponseDto<OrderDto>>(`${API_HOST}/api/v1/order`, addOrderDto)
      .pipe( tap(_ => this.resetOrder()) );
  }

  getPaymentDetails(orderId: string) {
    return this.http.get<ResponseDto<any>>(`${API_HOST}/api/v1/order/${orderId}/payment`);
  }

  private resetOrder() {
    this.paymentMethod = null;
    this.isCallbackNeeded = false;
    this.clientNote = '';

    this.customerService.resetCart();
  }
}
