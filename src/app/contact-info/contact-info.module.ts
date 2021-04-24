import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoComponent } from './contact-info.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [ContactInfoComponent],
  exports: [ContactInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxMaskModule.forRoot({ validation: false }),
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class ContactInfoModule { }
