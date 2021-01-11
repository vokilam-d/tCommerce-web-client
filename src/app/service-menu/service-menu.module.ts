import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceMenuComponent } from './service-menu.component';
import { RouterModule } from '@angular/router';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';


@NgModule({
  declarations: [ServiceMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    LangRouterLinkModule
  ],
  exports: [ServiceMenuComponent]
})
export class ServiceMenuModule { }
