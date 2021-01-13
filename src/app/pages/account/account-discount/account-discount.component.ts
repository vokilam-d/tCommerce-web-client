import { Component, OnInit } from '@angular/core';
import { HeadService } from '../../../services/head/head.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'account-discount',
  templateUrl: './account-discount.component.html',
  styleUrls: ['./account-discount.component.scss']
})
export class AccountDiscountComponent implements OnInit {

  get totalOrders() { return this.customerService.customer.totalOrdersCount; }
  get totalCost() { return this.customerService.customer.totalOrdersCost; }

  constructor(
    private headService: HeadService,
    private customerService: CustomerService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMeta();
  }

  private setMeta() {
    this.languageService.getTranslation('account_discount.my_discounts').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
