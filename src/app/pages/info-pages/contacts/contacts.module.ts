import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { HeaderModule } from '../../../header/header.module';
import { BreadcrumbsModule } from '../../../breadcrumbs/breadcrumbs.module';
import { FooterModule } from '../../../footer/footer.module';
import { RecentlyViewedProductsModule } from '../../../recently-viewed-products/recently-viewed-products.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HeaderModule,
    BreadcrumbsModule,
    FooterModule,
    RecentlyViewedProductsModule,
    TranslateModule.forChild()
  ]
})
export class ContactsModule { }
