import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthSuccessRoutingModule } from './oauth-success-routing.module';
import { OauthSuccessComponent } from './oauth-success.component';


@NgModule({
  declarations: [OauthSuccessComponent],
  imports: [
    CommonModule,
    OauthSuccessRoutingModule
  ]
})
export class OauthSuccessModule { }
