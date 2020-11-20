import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductVariantsComponent } from './product-variants.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductVariantsComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [ProductVariantsComponent]
})
export class ProductVariantsModule { }
