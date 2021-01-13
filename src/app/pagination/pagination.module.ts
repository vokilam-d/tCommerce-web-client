import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
