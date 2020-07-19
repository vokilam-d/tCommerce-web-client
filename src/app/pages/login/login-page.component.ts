import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { HeadService } from '../../services/head/head.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

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

  onLogin(customer: CustomerDto) {
    this.router.navigate(['/']);
  }

  switchToRegister() {
    this.router.navigate(['/', 'register']);
  }

  private setMeta() {
    this.headService.setMeta({ title: 'Войти в интернет-магазин Клондайк', description: 'Войти в интернет-магазин Клондайк' });
  }
}
