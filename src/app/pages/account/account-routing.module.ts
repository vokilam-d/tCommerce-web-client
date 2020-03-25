import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressesComponent } from './addresses/addresses.component';
import { AccountReviewsComponent } from './account-reviews/account-reviews.component';
import { AccountDiscountComponent } from './account-discount/account-discount.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', pathMatch: 'full', component: CustomerInfoComponent, data: { label: 'Контакты' } },
      { path: 'orders', component: AccountOrdersComponent, data: { label: 'Мои заказы' } },
      { path: 'wishlist', component: WishlistComponent, data: { label: 'Список желаний' } },
      { path: 'addresses', component: AddressesComponent, data: { label: 'Адреса доставки' } },
      { path: 'reviews', component: AccountReviewsComponent, data: { label: 'Мои отзывы' } },
      { path: 'discount', component: AccountDiscountComponent, data: { label: 'Скидки' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
