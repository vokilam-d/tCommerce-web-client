import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from '../../breadcrumbs/breadcrumbs.interface';
import { CustomerService } from '../../services/customer/customer.service';
import { HeadService } from '../../services/head/head.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = []
  get isCartEmpty(): boolean { return !this.customerService.cart || !this.customerService.cart.length; }

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private headService: HeadService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.setMetaAndBreadcrumbs();
  }

  private setMetaAndBreadcrumbs() {
    this.languageService.getTranslation('global.cart').subscribe(text => {
      this.headService.setMeta({ title: text, description: text });
      this.breadcrumbs = [{ title: text }];
    });
  }

  onContinueShopping() {
    this.router.navigate(['/']);
  }
}
