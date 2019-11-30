import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebClientNotFoundRoutingModule } from './not-found-routing.module';
import { WebClientNotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [WebClientNotFoundComponent],
  imports: [
    CommonModule,
    WebClientNotFoundRoutingModule
  ]
})
export class WebClientNotFoundModule { }
