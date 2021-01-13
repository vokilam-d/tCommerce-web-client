import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';
import { HeadService } from '../../services/head/head.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router: Router,
              private headService: HeadService,
              private customerService: CustomerService,
              private languageService: LanguageService
  ) { }

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
    this.languageService.getTranslation('registration_page.registration').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
    });
  }
}
