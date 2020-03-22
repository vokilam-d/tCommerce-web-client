import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotyComponent } from './noty.component';



@NgModule({
  declarations: [NotyComponent],
  imports: [
    CommonModule
  ],
  exports: [NotyComponent]
})
export class NotyModule { }
