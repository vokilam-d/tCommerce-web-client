import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientFilterComponent } from './filter.component';



@NgModule({
  declarations: [WebClientFilterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    WebClientFilterComponent
  ]
})
export class WebClientFilterModule { }
