import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/user/customer.service';

@Component({
  selector: 'mini-account',
  templateUrl: './mini-account.component.html',
  styleUrls: ['./mini-account.component.scss']
})
export class MiniAccountComponent implements OnInit {

  get isLoggedIn() { return this.customerService.isLoggedIn; }
  get customerName() { return this.customerService.customerName; }

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  onLoginClick() {
    if (!this.isLoggedIn) {
      this.customerService.showLoginModal();
    }
  }

  logout() {
    this.customerService.logout();
  }
}
