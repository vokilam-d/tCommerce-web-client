import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { HeaderModule } from '../../header/header.module';
import { SharedModule } from '../../shared/shared.module';
import { LangRouterLinkModule } from '../../lang-router-link/lang-router-link.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    ConfirmEmailRoutingModule,
    FooterModule,
    BreadcrumbsModule,
    HeaderModule,
    SharedModule,
    LangRouterLinkModule,
    TranslateModule.forChild()
  ]
})
export class ConfirmEmailModule { }
