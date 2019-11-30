import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientCategoryItemComponent } from './category-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WebClientCategoryItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebClientCategoryItemComponent
  ]
})
export class WebClientCategoryItemModule { }
