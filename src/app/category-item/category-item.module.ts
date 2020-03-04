import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from './category-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CategoryItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CategoryItemComponent
  ]
})
export class CategoryItemModule { }
