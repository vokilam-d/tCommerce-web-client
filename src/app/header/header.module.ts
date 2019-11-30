import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientHeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { WebClientServiceMenuComponent } from './service-menu/service-menu.component';
import { WebClientSearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    WebClientHeaderComponent,
    WebClientServiceMenuComponent,
    WebClientSearchBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebClientHeaderComponent
  ]
})
export class WebClientHeaderModule { }
