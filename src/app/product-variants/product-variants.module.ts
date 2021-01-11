import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductVariantsComponent } from './product-variants.component';
import { RouterModule } from '@angular/router';
import { LangRouterLinkModule } from '../lang-router-link/lang-router-link.module';



@NgModule({
  declarations: [ProductVariantsComponent],
  imports: [
    CommonModule,
    RouterModule,
    LangRouterLinkModule
  ],
  exports: [ProductVariantsComponent]
})
export class ProductVariantsModule { }
