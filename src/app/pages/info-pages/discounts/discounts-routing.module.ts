import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscountsComponent } from './discounts.component';

const routes: Routes = [{ path: '', component: DiscountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }
