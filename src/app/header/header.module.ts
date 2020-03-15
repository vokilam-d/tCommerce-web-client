import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CatalogMenuComponent } from './catalog-menu/catalog-menu.component';
import { HeaderSidebarComponent } from './header-sidebar/header-sidebar.component';
import { ServiceMenuModule } from '../service-menu/service-menu.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    CatalogMenuComponent,
    HeaderSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ServiceMenuModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
