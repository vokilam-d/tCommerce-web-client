import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientFooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WebClientFooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    WebClientFooterComponent
  ]
})
export class WebClientFooterModule { }
