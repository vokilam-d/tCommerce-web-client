import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerModalModule } from './customer-modal/customer-modal.module';
import { NotyModule } from './noty/noty.module';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { TransferHttpCacheModule } from '@nguniversal/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    CommonModule,
    CustomerModalModule,
    NotyModule,
    HttpClientModule,
    CartModalModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

