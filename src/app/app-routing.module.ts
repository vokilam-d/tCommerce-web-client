import { NgModule } from '@angular/core';
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
    matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult => {
      const path = segments.map(s => s.path).join('/');
      route.loadChildren = dynamicModuleResolver(path);

      return {
        consumed: segments,
        posParams: {
          slug: segments[0]
        }
      }
    },
    loadChildren: dynamicModuleResolver(),
    data: { isDynamicRoute: true }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router: Router) {
    // console.log(this.router.config);
    // reset config, get from providers, inject in server.ts ?
    this.handleRouteConfigReset();
  }

  private handleRouteConfigReset() {
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
