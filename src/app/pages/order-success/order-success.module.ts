import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './order-success.component';
import { HeaderModule } from '../../header/header.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [OrderSuccessComponent],
  imports: [
    CommonModule,
    OrderSuccessRoutingModule,
    HeaderModule,
    FooterModule,
    BreadcrumbsModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ]
})
export class OrderSuccessModule { }
