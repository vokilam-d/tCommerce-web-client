import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer/customer.service';
import { HeadService } from '../../shared/services/head/head.service';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router: Router,
              private headService: HeadService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.setMeta();
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

  private setMeta() {
    this.headService.setMeta({ title: 'Регистрация в интернет-магазине Клондайк', description: 'Регистрация в интернет-магазине Клондайк' });
  }
}
