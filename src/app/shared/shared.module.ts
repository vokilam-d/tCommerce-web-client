import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgUnsubscribe } from './directives/ng-unsubscribe.directive';
import { QuantityControlComponent } from './quantity-control/quantity-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { LangRouterLinkDirective } from './directives/lang-router-link.directive';


@NgModule({
  declarations: [PreloaderComponent, NgUnsubscribe, QuantityControlComponent, ClickOutsideDirective, LangRouterLinkDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [PreloaderComponent, NgUnsubscribe, QuantityControlComponent, ClickOutsideDirective, LangRouterLinkDirective]
})
export class SharedModule {
}
