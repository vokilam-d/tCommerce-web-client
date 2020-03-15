import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceMenuComponent } from './service-menu.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ServiceMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ServiceMenuComponent]
})
export class ServiceMenuModule { }
