import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [CartComponent]
})
export class CartModule { }
