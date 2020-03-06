import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './product-list-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductListItemComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductListItemComponent
  ]
})
export class ProductListItemModule { }
