import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgUnsubscribe } from './directives/ng-unsubscribe.directive';
import { FlyToCartDirective } from './directives/fly-to-cart.directive';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';


@NgModule({
  declarations: [PreloaderComponent, NgUnsubscribe, FlyToCartDirective, QuantityControlComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PreloaderComponent, NgUnsubscribe, FlyToCartDirective, QuantityControlComponent, ClickOutsideDirective]
})
export class SharedModule {
}
