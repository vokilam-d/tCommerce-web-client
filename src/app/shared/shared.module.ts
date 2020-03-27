import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgUnsubscribe } from './directives/ng-unsubscribe.directive';
import { FlyToCartDirective } from './directives/fly-to-cart.directive';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PreloaderComponent, NgUnsubscribe, FlyToCartDirective, QuantityControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PreloaderComponent, NgUnsubscribe, FlyToCartDirective, QuantityControlComponent]
})
export class SharedModule { }
