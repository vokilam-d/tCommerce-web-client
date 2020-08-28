import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedCategoriesComponent } from './linked-categories.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LinkedCategoriesComponent],
  exports: [
    LinkedCategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LinkedCategoriesModule { }
