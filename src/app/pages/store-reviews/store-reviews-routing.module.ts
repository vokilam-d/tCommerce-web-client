import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreReviewsComponent } from './store-reviews.component';

const routes: Routes = [{ path: '', component: StoreReviewsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreReviewsRoutingModule { }
