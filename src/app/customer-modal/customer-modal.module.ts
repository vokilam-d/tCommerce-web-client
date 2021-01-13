import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModalComponent } from './customer-modal.component';
import { LoginFormModule } from '../login-form/login-form.module';
import { RegistrationFormModule } from '../registration-form/registration-form.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [CustomerModalComponent],
  imports: [
    CommonModule,
    LoginFormModule,
    RegistrationFormModule,
    TranslateModule.forChild()
  ],
  exports: [CustomerModalComponent]
})
export class CustomerModalModule { }
