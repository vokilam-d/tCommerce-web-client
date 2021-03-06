import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, Injector, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData, ViewportScroller } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerModalModule } from './customer-modal/customer-modal.module';
import { NotyModule } from './noty/noty.module';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import localeRu from '@angular/common/locales/ru';
import { CommonRequestInterceptor } from './shared/interceptors/common-request.interceptor';
import { routesResolver } from './shared/factories/routes-resolver.function';
import { Router, Scroll } from '@angular/router';
import { ButtonUpModule } from './button-up/button-up.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { languageLoaderBrowserFactory } from './services/language/language-loader.browser';
import { DEFAULT_LANG } from './shared/constants';
import * as Sentry from '@sentry/angular';
import { MaintenanceService } from './services/maintenance/maintenance.service';
import { OopsPageModule } from './pages/oops-page/oops-page.module';
import { filter } from 'rxjs/operators';
import { DeviceService } from './services/device-detector/device.service';

registerLocaleData(localeRu);

export function setMaintenanceInfo(maintenance: MaintenanceService) { return () => maintenance.setMaintenanceInfo(); }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: languageLoaderBrowserFactory,
        deps: [HttpBackend, TransferState]
      },
      defaultLanguage: DEFAULT_LANG
    }),
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    CustomerModalModule,
    NotyModule,
    CartModalModule,
    ButtonUpModule,
    AnnouncementModule,
    OopsPageModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonRequestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: routesResolver,
      deps: [HttpClient, Router, Injector, TransferState, PLATFORM_ID],
      multi: true
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false
      })
    },
    {
      provide: Sentry.TraceService,
      deps: [Router]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: setMaintenanceInfo,
      deps: [MaintenanceService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  private lastNavigationUrl: string = '';

  constructor(
    router: Router,
    viewportScroller: ViewportScroller,
    deviceService: DeviceService
  ) {
    if (deviceService.isPlatformServer()) { return; }

    /**
     * Custom implementation of "scrollPositionRestoration" to not execute scroll on anchor change
     */
    router.events
      .pipe(
        filter(e => e instanceof Scroll)
      )
      .subscribe((e) => {
        const scrollEvt = e as unknown as Scroll;
        const newNavigationUrl = scrollEvt.routerEvent.urlAfterRedirects;

        if (scrollEvt.position) {
          // backward navigation
          viewportScroller.scrollToPosition(scrollEvt.position);
        } else if (!scrollEvt.anchor) {
          const [lastUrl, lastNavigationFragment] = this.lastNavigationUrl.split('#');
          if (lastUrl !== newNavigationUrl) {
            viewportScroller.scrollToPosition([0, 0]);
          }
        }

        this.lastNavigationUrl = newNavigationUrl;
      });
  }
}
