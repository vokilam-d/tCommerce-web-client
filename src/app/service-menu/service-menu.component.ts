import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { StoreReviewService } from '../services/store-review/store-review.service';

@Component({
  selector: 'service-menu',
  templateUrl: './service-menu.component.html',
  styleUrls: ['./service-menu.component.scss']
})
export class ServiceMenuComponent implements OnInit {

  get isLoggedIn() { return this.customerService.isLoggedIn; }
  get storeReviewsCount(): number { return this.storeReviewService.storeReviewsCount; }

  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() isInFooter: boolean = false;
  @Output() loginModalOpened = new EventEmitter();

  constructor(private customerService: CustomerService,
              private storeReviewService: StoreReviewService) {
  }

  ngOnInit() {
  }

  onLoginClick() {
    if (!this.isLoggedIn) {
      this.customerService.showLoginModal();
      this.loginModalOpened.emit();
    }
  }

}
