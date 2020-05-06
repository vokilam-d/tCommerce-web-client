import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer/customer.service';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    if (this.customerService.customer) {
      this.router.navigate(['/', 'account']);
    }
  }

  onRegister() {
    this.router.navigate(['/']);
  }

  switchToLogin() {
    this.router.navigate(['/', 'login']);
  }
}
