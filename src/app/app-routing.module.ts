import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DUMMY_PATH } from './shared/constants';
import { PageTypeEnum } from './shared/enums/page-type.enum';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: 'order-success',
    loadChildren: () => import('./pages/order-success/order-success.module').then(m => m.OrderSuccessModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./pages/cart-page/cart-page.module').then(m => m.CartPageModule)
  },
  {
    path: 'oauth-success',
    loadChildren: () => import('./pages/oauth-success/oauth-success.module').then(m => m.OauthSuccessModule)
  },
  {
    path: 'skidki',
    loadChildren: () => import('./pages/info-pages/discounts/discounts.module').then(m => m.DiscountsModule)
  },
  {
    path: 'dostavka-i-oplata',
    loadChildren: () => import('./pages/info-pages/shipment-payment-page/shipment-payment-page.module').then(m => m.ShipmentPaymentPageModule)
  },
  {
    path: 'vozvrat-tovara',
    loadChildren: () => import('./pages/info-pages/repayments/repayments.module').then(m => m.RepaymentsModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/info-pages/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'politika-konfidencialnosti',
    loadChildren: () => import('./pages/info-pages/policy/policy.module').then(m => m.PolicyModule)
  },
  {
    path: 'pg-gilding-tools-and-materials',
    loadChildren: () => import('./pages/info-pages/pg/pg.module').then(m => m.PgModule)
  },
  {
    path: 'otzyvy',
    loadChildren: () => import('./pages/store-reviews/store-reviews.module').then(m => m.StoreReviewsModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/registration-page/registration-page.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'confirm-email',
    loadChildren: () => import('./pages/confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search-page/search-page.module').then(m => m.SearchPageModule)
  },
  {
    path: 'blog',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/blog-pages/blog/blog.module').then(m => m.BlogModule)
      }
    ]
  },
  {
    path: DUMMY_PATH,
    children: [
      {
        path: PageTypeEnum.Product,
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
      },
      {
        path: PageTypeEnum.Category,
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: PageTypeEnum.BlogCategory,
        loadChildren: () => import('./pages/blog-pages/blog-category/blog-category.module').then(m => m.BlogCategoryModule)
      },
      {
        path: PageTypeEnum.BlogPost,
        loadChildren: () => import('./pages/blog-pages/blog-post/blog-post.module').then(m => m.BlogPostModule)
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
