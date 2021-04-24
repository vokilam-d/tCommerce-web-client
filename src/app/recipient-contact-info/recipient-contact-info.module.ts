import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipientContactInfoComponent } from './recipient-contact-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactInfoModule } from '../contact-info/contact-info.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RecipientContactInfoComponent],
  exports: [RecipientContactInfoComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    ContactInfoModule,
    ReactiveFormsModule
  ]
})
export class RecipientContactInfoModule { }
