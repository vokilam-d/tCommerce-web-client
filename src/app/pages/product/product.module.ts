import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebClientProductRoutingModule } from './product-routing.module';
import { WebClientProductComponent } from './product.component';
import { WebClientHeaderModule } from '../../header/header.module';
import { WebClientFooterModule } from '../../footer/footer.module';
import { WebClientBreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';

@NgModule({
  declarations: [WebClientProductComponent],
  imports: [
    CommonModule,
    WebClientProductRoutingModule,
    WebClientHeaderModule,
    WebClientFooterModule,
    WebClientBreadcrumbsModule
  ]
})
export class WebClientProductModule { }
