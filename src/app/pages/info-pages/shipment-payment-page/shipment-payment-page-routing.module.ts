import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShipmentPaymentPageComponent } from './shipment-payment-page.component';

const routes: Routes = [{ path: '', component: ShipmentPaymentPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipmentPaymentPageRoutingModule { }
