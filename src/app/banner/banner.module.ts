import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';



@NgModule({
  declarations: [BannerComponent],
  exports: [
    BannerComponent
  ],
  imports: [
    CommonModule,
    LangRouterLinkModule
  ]
})
export class BannerModule { }
