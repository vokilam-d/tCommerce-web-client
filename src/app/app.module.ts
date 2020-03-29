import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CustomerModalModule } from './customer-modal/customer-modal.module';
import { NotyModule } from './noty/noty.module';
import { CartModalModule } from './cart-modal/cart-modal.module';
import { TransferHttpCacheModule } from '@nguniversal/common';


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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

