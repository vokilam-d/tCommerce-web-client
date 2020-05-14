import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';
import { OrderDto } from '../../../shared/dtos/order.dto';
import { API_HOST, DEFAULT_ERROR_TEXT } from '../../../shared/constants';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {

  uploadedHost = API_HOST;
  orders: OrderDto[] = [];
  error: string;
  isLoading: boolean = false;

  constructor(private headService: HeadService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.fetchOrders();
    this.setMeta();
  }

  private fetchOrders() {
    this.isLoading = true;
    this.error = null;
    this.customerService.fetchOrders()
      .pipe( finalize(() => this.isLoading = false) )
      .subscribe(
        response => {
          this.orders = response.data;
        },
        error => this.error = error.error?.message || DEFAULT_ERROR_TEXT
      );
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Мои заказы', description: 'Мои заказы' });
  }
}
