import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PgRoutingModule } from './pg-routing.module';
import { PgComponent } from './pg.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';


@NgModule({
  declarations: [PgComponent],
  imports: [
    CommonModule,
    PgRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule
  ]
})
export class PgModule { }
