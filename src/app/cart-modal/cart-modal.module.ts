import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from './cart-modal.component';
import { CartModule } from '../cart/cart.module';



@NgModule({
  declarations: [CartModalComponent],
  imports: [
    CommonModule,
    CartModule
  ],
  exports: [CartModalComponent]
})
export class CartModalModule { }
