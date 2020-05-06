import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import {
  Route,
  RouteConfigLoadEnd,
  Router,
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup
} from '@angular/router';
import { dynamicModuleResolver } from './functions/dynamic-module-resolver.function';
import { isPlatformBrowser } from '@angular/common';


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
    matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult => {
      const path = segments.map(s => s.path).join('/');
      route.loadChildren = dynamicModuleResolver(path);

      return {
        consumed: segments,
        posParams: {
          slug: segments[0]
        }
      };
    },
    loadChildren: dynamicModuleResolver(),
    data: { isDynamicRoute: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router,
              @Inject(PLATFORM_ID) private platformId: any) {
    // console.log(this.router.config);
    // todo reset config, get from providers, inject in server.ts ?
    this.handleRouteConfigReset();
  }

  private handleRouteConfigReset() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.router.events.subscribe(next => {
      if (next instanceof RouteConfigLoadEnd && next.route.data && next.route.data.isDynamicRoute) {
        this.router.resetConfig(this.router.config.map(route => {
          delete route['_loadedConfig'];
          return route;
        }));
      }
    });
  }
}
