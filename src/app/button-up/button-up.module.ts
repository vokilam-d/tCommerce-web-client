import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonUpComponent } from './button-up.component';



@NgModule({
  declarations: [ButtonUpComponent],
  exports: [
    ButtonUpComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ButtonUpModule { }
