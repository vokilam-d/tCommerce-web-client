import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderSuccessComponent } from './order-success.component';

const routes: Routes = [{ path: '', component: OrderSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSuccessRoutingModule { }
