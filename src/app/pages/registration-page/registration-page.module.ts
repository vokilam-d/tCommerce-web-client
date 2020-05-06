import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationFormModule } from '../../registration-form/registration-form.module';
import { FooterModule } from '../../footer/footer.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';
import { HeaderModule } from '../../header/header.module';


@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    RegistrationFormModule,
    FooterModule,
    BreadcrumbsModule,
    HeaderModule
  ]
})
export class RegistrationPageModule { }
