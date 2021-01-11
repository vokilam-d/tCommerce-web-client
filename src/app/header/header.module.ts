import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ServiceMenuModule } from '../service-menu/service-menu.module';
import { MiniCartComponent } from './mini-cart/mini-cart.component';
import { MiniAccountComponent } from './mini-account/mini-account.component';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    CatalogMenuComponent,
    SidebarMenuComponent,
    MiniCartComponent,
    MiniAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ServiceMenuModule,
    ReactiveFormsModule,
    LangRouterLinkModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
