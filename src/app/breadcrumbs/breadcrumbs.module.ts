import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientBreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [WebClientBreadcrumbsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebClientBreadcrumbsComponent
  ]
})
export class WebClientBreadcrumbsModule { }
