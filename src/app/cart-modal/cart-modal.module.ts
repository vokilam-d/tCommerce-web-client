import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartModalComponent } from './cart-modal.component';
import { CartModule } from '../cart/cart.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CartModalComponent],
  imports: [
    CommonModule,
    CartModule,
    TranslateModule
  ],
  exports: [CartModalComponent]
})
export class CartModalModule { }
