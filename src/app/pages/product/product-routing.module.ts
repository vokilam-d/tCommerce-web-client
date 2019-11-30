import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebClientProductComponent } from './product.component';

const routes: Routes = [{
  path: '',
  component: WebClientProductComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebClientProductRoutingModule { }
