import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule
  ]
})
export class ProductModule { }
