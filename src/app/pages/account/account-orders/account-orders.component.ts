import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { OrderDto } from '../../../shared/dtos/order.dto';
import { DEFAULT_ERROR_TEXT, UPLOADED_HOST } from '../../../shared/constants';
import { finalize } from 'rxjs/operators';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {

  uploadedHost = UPLOADED_HOST;
  orders: OrderDto[] = [];
  error: string;
  isLoading: boolean = false;

  constructor(
    private headService: HeadService,
    private customerService: CustomerService,
    private languageService: LanguageService
  ) { }

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
    this.languageService.getTranslation('global.my_orders').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
