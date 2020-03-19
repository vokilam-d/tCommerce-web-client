import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader/preloader.component';
import { NgUnsubscribe } from './directives/ng-unsubscribe.directive';



@NgModule({
  declarations: [PreloaderComponent, NgUnsubscribe],
  imports: [
    CommonModule
  ],
  exports: [PreloaderComponent, NgUnsubscribe]
})
export class SharedModule { }
