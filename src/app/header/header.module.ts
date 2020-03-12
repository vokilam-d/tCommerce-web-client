import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { ServiceMenuComponent } from './service-menu/service-menu.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ServiceMenuComponent,
    SearchBarComponent,
    CatalogMenuComponent,
    HeaderSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
