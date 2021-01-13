import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { HeaderModule } from '../../header/header.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../footer/footer.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    SharedModule,
    ReactiveFormsModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ]
})
export class ResetPasswordModule { }
