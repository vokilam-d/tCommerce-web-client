import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { HeaderModule } from '../../header/header.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    ConfirmEmailRoutingModule,
    FooterModule,
    BreadcrumbsModule,
    HeaderModule,
    SharedModule
  ]
})
export class ConfirmEmailModule { }
