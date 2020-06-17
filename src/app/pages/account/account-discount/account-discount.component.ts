import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../shared/services/head/head.service';
import { CustomerService } from '../../../shared/services/customer/customer.service';

@Component({
  selector: 'account-discount',
  templateUrl: './account-discount.component.html',
  styleUrls: ['./account-discount.component.scss']
})
export class AccountDiscountComponent implements OnInit {

  get totalOrders() { return this.customerService.customer.totalOrdersCount; }
  get totalCost() { return this.customerService.customer.totalOrdersCost; }

  constructor(private headService: HeadService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Мои накопительные скидки', description: 'Мои накопительные скидки' });
  }
}
