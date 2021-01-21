import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSocialModule } from '../auth-social/auth-social.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthSocialModule,
    TranslateModule.forChild()
  ],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
