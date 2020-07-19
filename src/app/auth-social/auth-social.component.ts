import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';

@Component({
  selector: 'auth-social',
  templateUrl: './auth-social.component.html',
  styleUrls: ['./auth-social.component.scss']
})
export class AuthSocialComponent implements OnInit {

  @Output('authSuccess') authSuccessEmitter = new EventEmitter();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  authSocial(provider: 'google' | 'facebook') {
    const url = this.customerService.getSocialLoginUrl(provider);
    const child = window.open(url, '', "menubar=0,toolbar=0,status=0,width=626,height=436");

    const interval = setInterval(() => {
      if (child.closed) {
        this.customerService.fetchCustomer().subscribe(
          response => {
            if (response.data) {
              this.authSuccessEmitter.emit();
            }
          }
        );
        clearInterval(interval);
      }
    }, 500);
  }
}
