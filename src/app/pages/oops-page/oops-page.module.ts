import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OopsPageComponent } from './oops-page.component';
import { HeaderModule } from '../../header/header.module';



@NgModule({
  declarations: [OopsPageComponent],
  exports: [
    OopsPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ]
})
export class OopsPageModule { }
