import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipmentPaymentPageRoutingModule } from './shipment-payment-page-routing.module';
import { ShipmentPaymentPageComponent } from './shipment-payment-page.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';


@NgModule({
  declarations: [ShipmentPaymentPageComponent],
  imports: [
    CommonModule,
    ShipmentPaymentPageRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule
  ]
})
export class ShipmentPaymentPageModule { }
