import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSocialComponent } from './auth-social.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [AuthSocialComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [AuthSocialComponent]
})
export class AuthSocialModule { }
