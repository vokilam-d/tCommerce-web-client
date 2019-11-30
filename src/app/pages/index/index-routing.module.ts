import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebClientIndexComponent } from './index.component';

const routes: Routes = [{
  path: '',
  component: WebClientIndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebClientIndexRoutingModule { }
