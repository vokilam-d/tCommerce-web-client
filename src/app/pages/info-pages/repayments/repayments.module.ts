import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepaymentsRoutingModule } from './repayments-routing.module';
import { RepaymentsComponent } from './repayments.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [RepaymentsComponent],
  imports: [
    CommonModule,
    RepaymentsRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    RecentlyViewedProductsModule,
    TranslateModule.forChild()
  ]
})
export class RepaymentsModule { }
