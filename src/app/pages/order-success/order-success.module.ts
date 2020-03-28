import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './order-success.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [OrderSuccessComponent],
  imports: [
    CommonModule,
    OrderSuccessRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule
  ]
})
export class OrderSuccessModule { }
