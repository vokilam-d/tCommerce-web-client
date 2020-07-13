import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PgComponent } from './pg.component';

const routes: Routes = [{ path: '', component: PgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgRoutingModule { }
