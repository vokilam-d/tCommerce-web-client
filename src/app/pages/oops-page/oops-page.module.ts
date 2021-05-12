import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OopsPageComponent } from './oops-page.component';
import { HeaderModule } from '../../header/header.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [OopsPageComponent],
  exports: [
    OopsPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    TranslateModule
  ]
})
export class OopsPageModule { }
