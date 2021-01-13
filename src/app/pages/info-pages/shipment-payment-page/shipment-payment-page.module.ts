import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentPaymentPageRoutingModule } from './shipment-payment-page-routing.module';
import { ShipmentPaymentPageComponent } from './shipment-payment-page.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ShipmentPaymentPageComponent],
  imports: [
    CommonModule,
    ShipmentPaymentPageRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    RecentlyViewedProductsModule,
    TranslateModule.forChild()
  ]
})
export class ShipmentPaymentPageModule { }
