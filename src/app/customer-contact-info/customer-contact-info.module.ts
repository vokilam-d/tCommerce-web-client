import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerContactInfoComponent } from './customer-contact-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactInfoModule } from '../contact-info/contact-info.module';



@NgModule({
  declarations: [CustomerContactInfoComponent],
  exports: [CustomerContactInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    ContactInfoModule
  ]
})
export class CustomerContactInfoModule { }
