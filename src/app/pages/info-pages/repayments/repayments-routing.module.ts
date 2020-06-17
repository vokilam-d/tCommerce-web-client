import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RepaymentsComponent } from './repayments.component';

const routes: Routes = [{ path: '', component: RepaymentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepaymentsRoutingModule { }
