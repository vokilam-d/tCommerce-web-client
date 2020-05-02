import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { DiscountsComponent } from './discounts.component';
import { HeaderModule } from '../../../header/header.module';
import { FooterModule } from '../../../footer/footer.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';


@NgModule({
  declarations: [DiscountsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule
  ]
})
export class DiscountsModule { }
