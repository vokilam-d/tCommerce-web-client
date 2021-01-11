import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedCategoriesComponent } from './linked-categories.component';
import { RouterModule } from '@angular/router';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';



@NgModule({
  declarations: [LinkedCategoriesComponent],
  exports: [
    LinkedCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LangRouterLinkModule
  ]
})
export class LinkedCategoriesModule { }
