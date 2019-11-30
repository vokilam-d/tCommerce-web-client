import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebClientSortingComponent } from './sorting.component';



@NgModule({
  declarations: [WebClientSortingComponent],
  imports: [
    CommonModule
  ],
  exports: [
    WebClientSortingComponent
  ]
})
export class WebClientSortingModule { }
