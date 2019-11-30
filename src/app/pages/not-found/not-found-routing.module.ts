import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebClientNotFoundComponent } from './not-found.component';

const routes: Routes = [{
  path: '',
  component: WebClientNotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebClientNotFoundRoutingModule { }
