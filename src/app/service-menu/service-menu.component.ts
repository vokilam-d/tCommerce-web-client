import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../shared/services/customer/customer.service';

@Component({
  selector: 'service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {

  get isLoggedIn() { return this.customerService.isLoggedIn; }

  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() storeReviewsCount: number;
  @Output() loginModalOpened = new EventEmitter();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  onLoginClick() {
    if (!this.isLoggedIn) {
      this.customerService.showLoginModal();
      this.loginModalOpened.emit();
    }
  }

}
