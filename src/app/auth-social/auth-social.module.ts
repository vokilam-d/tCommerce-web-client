import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthSocialComponent } from './auth-social.component';



@NgModule({
  declarations: [AuthSocialComponent],
  imports: [
    CommonModule
  ],
  exports: [AuthSocialComponent]
})
export class AuthSocialModule { }
