import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerContactInfoComponent } from './customer-contact-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactInfoModule } from '../contact-info/contact-info.module';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [CustomerContactInfoComponent],
  exports: [CustomerContactInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    NgxMaskModule.forRoot({ validation: false }),
    ContactInfoModule
  ]
})
export class CustomerContactInfoModule { }
