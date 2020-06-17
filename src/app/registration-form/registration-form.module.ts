import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import { AuthSocialModule } from '../auth-social/auth-social.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthSocialModule
  ],
  exports: [RegistrationFormComponent]
})
export class RegistrationFormModule { }
