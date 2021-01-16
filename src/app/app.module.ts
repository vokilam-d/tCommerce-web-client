import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerModalModule } from './customer-modal/customer-modal.module';
import { NotyModule } from './noty/noty.module';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import localeRu from '@angular/common/locales/ru';
import { CommonRequestInterceptor } from './shared/interceptors/common-request.interceptor';
import { routesResolver } from './shared/factories/routes-resolver.function';
import { Router } from '@angular/router';
import { ButtonUpModule } from './button-up/button-up.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { languageLoaderBrowserFactory } from './services/language/language-loader.browser';
import { DEFAULT_LANG } from './shared/constants';

registerLocaleData(localeRu);

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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    CustomerModalModule,
    NotyModule,
    CartModalModule,
    ButtonUpModule,
    AnnouncementModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: CommonRequestInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: routesResolver, deps: [HttpClient, Router, Injector, TransferState, PLATFORM_ID], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

