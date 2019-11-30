import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WebClientAppRoutingModule } from './app-routing.module';
import { WebClientAppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    WebClientAppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    WebClientAppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [WebClientAppComponent]
})
export class WebClientAppModule { }

