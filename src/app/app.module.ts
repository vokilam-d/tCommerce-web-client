import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CustomerModalModule } from './customer-modal/customer-modal.module';
import { NotyModule } from './noty/noty.module';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import localeRu from '@angular/common/locales/ru';
import { CommonRequestInterceptor } from './shared/interceptors/common-request.interceptor';

registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    CustomerModalModule,
    NotyModule,
    CartModalModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: HTTP_INTERCEPTORS, useClass: CommonRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

